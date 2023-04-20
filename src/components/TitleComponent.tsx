type Props = {
  text: string | undefined;
};

export default function TitleComponent({ text }: Props) {
  return <h2 className="title">{text}</h2>;
}
