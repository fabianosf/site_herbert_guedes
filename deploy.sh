#!/usr/bin/env bash
# =============================================================================
#  GuedesLab — laptop -> server deploy
# -----------------------------------------------------------------------------
#  Run this from YOUR LAPTOP. Requires:
#    1. SSH key-based authentication already configured to the remote host.
#       (ssh root@$REMOTE_HOST must succeed without a password prompt)
#    2. Remote host already bootstrapped via scripts/server-bootstrap.sh
#
#  What it does:
#    - SSH into the server
#    - git fetch + reset to the requested ref (default: main)
#    - docker compose --profile prod up -d --build
#    - prune dangling images
#
#  Env vars (all optional, with sensible defaults):
#    REMOTE_USER    default: root
#    REMOTE_HOST    default: 92.113.33.16
#    REMOTE_DIR     default: /opt/guedeslab
#    GIT_REF        default: main
#    SSH_KEY        default: ~/.ssh/id_ed25519 (or whatever ssh-agent has)
#
#  Examples:
#    ./deploy.sh                                # deploy main
#    GIT_REF=develop ./deploy.sh                # deploy develop
#    REMOTE_USER=deploy ./deploy.sh             # use non-root deploy user
# =============================================================================

set -euo pipefail

REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_HOST="${REMOTE_HOST:-92.113.33.16}"
REMOTE_DIR="${REMOTE_DIR:-/opt/guedeslab}"
GIT_REF="${GIT_REF:-main}"

SSH_OPTS=(
  -o "StrictHostKeyChecking=accept-new"
  -o "ServerAliveInterval=30"
  -o "ConnectTimeout=10"
)
if [ -n "${SSH_KEY:-}" ]; then
  SSH_OPTS+=( -i "${SSH_KEY}" )
fi

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m✓ \033[0m %s\n' "$*"; }
err()  { printf '\033[1;31m!! \033[0m%s\n' "$*" >&2; }

log "Target  : ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"
log "Git ref : ${GIT_REF}"

log "Testing SSH connectivity"
if ! ssh "${SSH_OPTS[@]}" -o BatchMode=yes "${REMOTE_USER}@${REMOTE_HOST}" 'true' 2>/dev/null; then
  err "SSH key auth to ${REMOTE_USER}@${REMOTE_HOST} failed."
  err "Set it up with: ssh-copy-id ${REMOTE_USER}@${REMOTE_HOST}"
  exit 1
fi
ok "SSH key auth working"

log "Running remote deploy"
ssh "${SSH_OPTS[@]}" "${REMOTE_USER}@${REMOTE_HOST}" \
  REMOTE_DIR="${REMOTE_DIR}" GIT_REF="${GIT_REF}" bash -s <<'REMOTE'
set -euo pipefail

REMOTE_DIR="${REMOTE_DIR:?}"
GIT_REF="${GIT_REF:?}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not installed on server. Run scripts/server-bootstrap.sh first." >&2
  exit 1
fi

if [ ! -d "${REMOTE_DIR}/.git" ]; then
  echo "Repo not found at ${REMOTE_DIR}. Run scripts/server-bootstrap.sh first." >&2
  exit 1
fi

cd "${REMOTE_DIR}"

echo "==> Fetching latest"
git fetch --all --prune

echo "==> Resetting to origin/${GIT_REF}"
git reset --hard "origin/${GIT_REF}"

echo "==> Building + restarting prod"
docker compose --profile prod up -d --build

echo "==> Pruning dangling images"
docker image prune -f >/dev/null

echo "==> Active containers:"
docker compose ps
REMOTE

ok "Deploy finished. App live on http://${REMOTE_HOST}:8080"
