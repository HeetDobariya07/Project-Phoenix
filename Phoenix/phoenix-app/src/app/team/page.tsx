import TeamSection from '@/components/team';
import { PageLayout, NavigationDock } from '@/components';

export const metadata = {
  title: 'Team - Project Phoenix',
  description: 'Meet the talented team behind Project Phoenix cervical cancer cell classification system.',
};

export default function TeamPage() {
  return (
    <PageLayout>
      <TeamSection />
      <NavigationDock />
    </PageLayout>
  );
}
