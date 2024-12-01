import {LoaderFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {getAuthFromRequest} from "~/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Social Commerce" },
    {
      name: "description",
      content: "Social Commerce - Uma plataforma para descomplicar o processo de compra e vendas de produtos"
    },
    {
      name: "keywords",
      content: "Ecommerce, Vendas, Compras, Produtos, Promoções, Social Commerce, Smartphones, Tecnologias, Roupas, Televisores, Ofertas"
    }
  ]
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { userId, accountType } = await getAuthFromRequest(request);
  if (userId) {
    if (accountType === "buyer") {
      throw redirect("/buyer");
    } else {
      throw redirect("/seller");
    }
  }
  throw redirect("/login");
}

export default function Index() {
  return (
    <></>
  );
}
