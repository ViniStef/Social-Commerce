import style from "~/components/WishlistDisplay/style.module.scss";
import {useContext} from "react";
import { RemoveWishlistContext } from "~/routes/buyer/route";
import { PublicationsResultType } from "~/routes/buyer/types";
type WishItemProps = {
    publicationId: number;
    productImg: string;
    productName: string;
    productPrice: number;
}

export default function WishItem({ publicationId, productImg, productName, productPrice } :WishItemProps) {
    const { cartList, setCartList } = useContext(RemoveWishlistContext);

    function removeProductCart(publicationId: number) {
        const productExists: boolean = cartList.some((cartItem:PublicationsResultType) => cartItem.publicationId === publicationId);

        if (productExists) {
            setCartList((prevValue: PublicationsResultType[]) => {
                return prevValue.filter(publication => publication.publicationId != publicationId);
            })
        }
    }

    return (
        <li className={style.wish__item}>
            <img className={style.wish__image} src={productImg} alt="Imagem do Produto"/>
            <div className={style.wish__info}>
                <p className={style.info__name}>{productName}</p>
                <p className={style.info__price}>R$ <span className={style.price__value}>{productPrice}</span></p>
            </div>

                <input type="hidden" name={"_action"} value={"remove_publication_wishlist"}/>
                <input type="hidden" name={"publicationId"} value={publicationId}/>
                <button onClick={(e) => removeProductCart(publicationId)} className={style.wish__remove}>
                    Remover
                </button>
        </li>
    );
}