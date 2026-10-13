import { AiWebSecondaryPage, aiWebSecondaryMetadata } from '../aiweb-secondary-page';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return aiWebSecondaryMetadata((await params).locale, 'integrations'); }
export default async function IntegrationsPage({ params }: Props) { return <AiWebSecondaryPage locale={(await params).locale} kind="integrations" />; }
