import Image from "next/image";

type NotFoundUserSectionProps = {
  searchText: string;
};

export function NotFoundUserSection({
  searchText,
}: Readonly<NotFoundUserSectionProps>) {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-8">
      <div className="grid place-items-center">
        <strong className="text-xl font-semibold text-primary">
          &quot;{searchText}&quot;
        </strong>

        <h2 className="text-xl font-semibold">Nenhum usuário encontrado</h2>
        <p>Verifique se a escrita está correta ou tente novamente</p>
      </div>
      <Image
        alt="Imagem de uma nave espacial"
        src="/undraw_taken.svg"
        width={200}
        height={200}
      />
    </section>
  );
}
