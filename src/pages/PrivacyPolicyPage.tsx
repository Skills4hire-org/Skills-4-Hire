import Container from "@/components/global/Container";
import PageHeader from "@/components/global/PageHeader";
import { privacyPolicyData } from "@/utils/database";

export default function PrivacyPolicyPage() {
  const { title, description } = privacyPolicyData;

  return (
    <div className="pb-10">
      <PageHeader title={title} />
      <Container>
        <div className="mt-6 text-sm md:text-base text-gray-700 text-justify leading-relaxed px-2 md:px-6 space-y-4">
          {description.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}
