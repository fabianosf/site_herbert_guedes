#!/usr/bin/env bash
# =============================================================================
#  GuedesLab — server bootstrap (one-time)
# -----------------------------------------------------------------------------
#  Run AS ROOT on a fresh Debian / Ubuntu host (Linux Mint server edition OK).
#
#  What it does:
#    1. Updates the OS and installs prerequisites (curl, git, ufw).
#    2. Installs Docker Engine + Compose plugin from the official repo.
#    3. Configures the firewall to allow SSH and tcp/8080 only.
#    4. Hardens SSH:
#         - PasswordAuthentication no
#         - PermitRootLogin prohibit-password
#         IMPORTANT: only takes effect after you have key-based auth working.
#    5. Clones the application repo into REMOTE_DIR.
#
#  BEFORE running this script, make sure you already added your laptop's SSH
#  public key to /root/.ssh/authorized_keys on the server. Otherwise SSH
#  hardening will lock you out.
#
#  Usage on the server (as root):
#     curl -fsSL https://raw.githubusercontent.com/fabianosf/site_herbert_guedes/main/scripts/server-bootstrap.sh | bash
#  Or copy the file over and run:
#     bash scripts/server-bootstrap.sh
# =============================================================================

set -euo pipefail

GIT_REPO="${GIT_REPO:-https://github.com/fabianosf/site_herbert_guedes.git}"
REMOTE_DIR="${REMOTE_DIR:-/opt/guedeslab}"

log() { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
err() { printf '\033[1;31m!! \033[0m%s\n' "$*" >&2; }

if [ "${EUID}" -ne 0 ]; then
  err "Run as root (sudo -i)."
  exit 1
fi

log "Updating package index"
apt-get update -y
apt-get install -y --no-install-recommends ca-certificates curl gnupg lsb-release git ufw

if ! command -v docker >/dev/null 2>&1; then
  log "Installing Docker Engine"
  . /etc/os-release
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL "https://download.docker.com/linux/${ID}/gpg" \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${ID} ${VERSION_CODENAME} stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
else
  log "Docker already installed: $(docker --version)"
fi

systemctl enable --now docker

log "Configuring firewall (ufw)"
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 8080/tcp comment "GuedesLab HTTP"
yes | ufw enable || true
ufw status verbose || true

log "Hardening SSH (after this only key-based auth is allowed)"
if grep -q '^#\?PasswordAuthentication' /etc/ssh/sshd_config; then
  sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
else
  echo "PasswordAuthentication no" >> /etc/ssh/sshd_config
fi
if grep -q '^#\?PermitRootLogin' /etc/ssh/sshd_config; then
  sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
else
  echo "PermitRootLogin prohibit-password" >> /etc/ssh/sshd_config
fi
systemctl reload ssh 2>/dev/null || systemctl reload sshd

log "Cloning repo to ${REMOTE_DIR}"
mkdir -p "${REMOTE_DIR}"
if [ -d "${REMOTE_DIR}/.git" ]; then
  log "Repo already present — pulling latest"
  git -C "${REMOTE_DIR}" fetch --all --prune
  git -C "${REMOTE_DIR}" reset --hard origin/main
else
  git clone "${GIT_REPO}" "${REMOTE_DIR}"
fi

log "First build + start (prod profile)"
cd "${REMOTE_DIR}"
docker compose --profile prod up -d --build

log "Bootstrap complete."
log "Now run \`./deploy.sh\` from your laptop for future deploys."
log "App should be live on: http://$(curl -s ifconfig.me || hostname -I | awk '{print $1}'):8080"
