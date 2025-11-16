import TeamSection from '@/components/team';
import { PageLayout } from '@/components';
import StickyFooter from '@/components/footer';

export const metadata = {
  title: 'Team - Project Phoenix',
  description: 'Meet the talented team behind Project Phoenix cervical cancer cell classification system.',
};

export default function TeamPage() {
  return (
    <>
      <PageLayout>
        <TeamSection />
      </PageLayout>
      <StickyFooter />
    </>
  );
}
