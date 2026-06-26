import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Instagram, Mail } from 'lucide-react';
import { labMembers, type LabMember, type MemberRole, socialLinks } from '../../config/theme';
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

const ALESSANDRA_STUDENT_IDS = [
  'gabriane-porcino',
  'maria-luiza-silva',
  'vitoria-pinto',
  'julia-andrade',
  'ana-luiza-pires',
  'kaylane-goes',
  'bianca-sa',
  'hanna-ribeiro',
];

type PhotoProps = { photo?: string; initials: string; color: string; name: string };

const MemberPhoto = ({ photo, initials, color, name }: PhotoProps) => {
  const [imgErr, setImgErr] = useState(false);
  if (!photo || imgErr) {
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
  const [activeTab, setActiveTab] = useState<'main' | 'partner'>('main');

  const partners = labMembers.filter((m) => m.role === 'partner');
  const alessandraStudents = labMembers.filter((m) => ALESSANDRA_STUDENT_IDS.includes(m.id));

  const mainMembers = labMembers.filter(
    (m) => m.role !== 'partner' && !ALESSANDRA_STUDENT_IDS.includes(m.id),
  );

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

        {/* Tab buttons */}
        <div className="flex gap-2 mb-12">
          <button
            onClick={() => setActiveTab('main')}
            className={cn(
              'px-5 py-2 text-sm font-medium rounded-full border transition-colors',
              activeTab === 'main'
                ? 'border-nebula-violet/50 bg-nebula-violet/10 text-bone-50'
                : 'border-chrome/10 text-bone-400 hover:text-bone-200 hover:border-chrome/20',
            )}
          >
            {t('members.tabs.main')}
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={cn(
              'px-5 py-2 text-sm font-medium rounded-full border transition-colors',
              activeTab === 'partner'
                ? 'border-nebula-violet/50 bg-nebula-violet/10 text-bone-50'
                : 'border-chrome/10 text-bone-400 hover:text-bone-200 hover:border-chrome/20',
            )}
          >
            {t('members.tabs.partner')}
          </button>
        </div>

        {/* Tab: Libtec + LIC */}
        {activeTab === 'main' && (
          <div className="space-y-16">
            {ROLE_GROUPS.map(({ groupKey, roles }) => {
              const group = mainMembers.filter((m) => roles.includes(m.role));
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
        )}

        {/* Tab: Parceria UNIRIO */}
        {activeTab === 'partner' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-14"
          >
            {/* Partner cards */}
            <div>
              <motion.ul
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {partners.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </motion.ul>

              {/* Contact + Instagram */}
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={`mailto:${t('members.alessandra.email')}`}
                  className="flex items-center gap-2 text-sm text-bone-400 hover:text-bone-50 transition-colors"
                >
                  <Mail className="h-4 w-4 text-nebula-violet" aria-hidden="true" />
                  {t('members.alessandra.email')}
                </a>
                <a
                  href={socialLinks.instagramGptImunoPrecisao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-bone-400 hover:text-bone-50 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-nebula-pink" aria-hidden="true" />
                  @gptimunoprecisao
                </a>
                <a
                  href={socialLinks.instagramImUNIRIO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-bone-400 hover:text-bone-50 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-nebula-pink" aria-hidden="true" />
                  @imunirio
                </a>
              </div>
            </div>

            {/* ImUNIRIO description */}
            <div className="rounded-2xl border border-nebula-violet/20 bg-nebula-violet/5 p-6 md:p-8">
              <h3 className="text-sm font-semibold text-bone-50 mb-3">
                {t('members.imunirio.title')}
              </h3>
              <p className="text-sm text-bone-300 leading-relaxed">
                {t('members.imunirio.description')}
              </p>
            </div>

            {/* Alessandra's students */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 text-xs uppercase tracking-[0.3em] text-bone-400 border-b border-chrome/8 pb-3"
              >
                {t('members.alessandra.students_label')}
              </motion.h2>
              <motion.ul
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {alessandraStudents.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
};
