import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { labMembers, type LabMember, type MemberRole } from '../../config/theme';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { cn } from '../../lib/cn';

type RoleGroup = {
  groupKey: string;
  roles: MemberRole[];
};

const ROLE_GROUPS: RoleGroup[] = [
  { groupKey: 'professors', roles: ['coordinator', 'partner'] },
  { groupKey: 'secretary', roles: ['secretary'] },
  { groupKey: 'postdoc', roles: ['postdoc'] },
  { groupKey: 'phd', roles: ['phd'] },
  { groupKey: 'masters', roles: ['masters'] },
  { groupKey: 'undergrad', roles: ['undergrad'] },
];

type PhotoProps = { photo: string; initials: string; color: string; name: string };

const MemberPhoto = ({ photo, initials, color, name }: PhotoProps) => {
  const [imgErr, setImgErr] = useState(false);
  if (imgErr) {
    return (
      <div
        className={cn(
          'grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br ring-1 ring-chrome/10 font-mono text-sm text-bone-50',
          color,
        )}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={photo}
      alt={name}
      className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-chrome/10"
      onError={() => setImgErr(true)}
    />
  );
};

const MemberCard = ({ member }: { member: LabMember }) => {
  const { t } = useTranslation();
  const person = t(`members.people.${member.id}`, { returnObjects: true }) as {
    name: string;
    title: string;
    focus: string;
  };
  const roleLabel = t(`members.roles.${member.role}`);

  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      className="group/m relative overflow-hidden rounded-2xl border border-chrome/5 glass-card p-6 md:p-8"
    >
      <div
        className={cn(
          'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br blur-3xl opacity-60 transition-opacity duration-700 group-hover/m:opacity-100',
          member.color,
        )}
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-4">
        <MemberPhoto
          photo={member.photo}
          initials={member.initials}
          color={member.color}
          name={person.name}
        />
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-bone-400 truncate">{roleLabel}</p>
          <h3 className="mt-1 text-base font-semibold text-bone-50 leading-snug">{person.name}</h3>
          {person.title && (
            <p className="text-xs text-bone-400 mt-0.5">{person.title}</p>
          )}
        </div>
      </div>

      <p className="relative mt-5 text-sm text-bone-300">
        <span className="text-bone-400">Focus · </span>
        {person.focus}
      </p>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-chrome/10 via-chrome/5 to-transparent"
        />
        {member.lattes && (
          <a
            href={member.lattes}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Lattes — ${person.name}`}
            className="flex items-center gap-1 text-xs text-bone-400 transition-colors hover:text-accent"
          >
            Lattes <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
        <span className="text-xs font-mono text-bone-400">{member.lab.toUpperCase()}</span>
      </div>
    </motion.li>
  );
};

export const Members = () => {
  const { t } = useTranslation();

  return (
    <section id="members" className="section relative bg-ink-900/40">
      <Container size="full">
        <SectionHeader
          index={t('members.section.index')}
          eyebrow={t('members.section.eyebrow')}
          title={
            <>
              {t('members.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('members.section.title_b')}
              </span>
            </>
          }
          description={t('members.section.description')}
        />

        <div className="space-y-16">
          {ROLE_GROUPS.map(({ groupKey, roles }) => {
            const group = labMembers.filter((m) => roles.includes(m.role));
            if (group.length === 0) return null;
            return (
              <div key={groupKey}>
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 text-xs uppercase tracking-[0.3em] text-bone-400 border-b border-chrome/8 pb-3"
                >
                  {t(`members.groups.${groupKey}`)}
                </motion.h2>
                <motion.ul
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {group.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </motion.ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
