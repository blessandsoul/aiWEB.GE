import { AiWebSecondaryPage, aiWebSecondaryMetadata } from '../aiweb-secondary-page';
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return aiWebSecondaryMetadata((await params).locale, 'security'); }
export default async function SecurityPage({ params }: Props) { return <AiWebSecondaryPage locale={(await params).locale} kind="security" />; }
