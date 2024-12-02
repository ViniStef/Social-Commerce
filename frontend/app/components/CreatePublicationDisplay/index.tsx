import style from "./style.module.scss";
import {Form, useActionData} from "@remix-run/react";
import {action} from "~/routes/seller/route";
import eraser from "~/assets/icons/eraser-fill.svg";
import background from "~/assets/images/card-image.svg";
import {useEffect, useState} from "react";

export default function CreatePublicationDisplay() {
    const data = useActionData<typeof action>();
    const [isDiscountSelected, setIsDiscountSelected] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        setImageSrc("");
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImageSrc(fileURL);
        }
    };

    let errors = data?.schemaErrors || null;

    return (

        <section className={style.create__publication}>
            <h1 className={style.publication__headline}>Publicação</h1>
            <Form encType={"multipart/form-data"} className={style.publication__form} method={"post"}>
                <input type="hidden" name={"_action"} value={"create_publication"}/>

                <div className={style.initial__settings}>
                    <div className={style.product__name}>
                        <label className={style.base__headline} htmlFor="product_name">Nome do Produto</label>
                        <input id={"product_name"} name={"product_name"} className={style.name__input} type="text"/>
                        {data?.schemaErrors?.product_name && <p className={style.error__message}>{data?.schemaErrors.product_name}</p>}
                    </div>

                    <div className={style.category__choices}>
                        <label className={style.base__headline} htmlFor="categories__option">Categoria do
                            Produto</label>
                        <select className={style.category__select} name="category" id="categories__option">
                            <option value={1}>Temporada</option>
                            <option value={2}>Televisores</option>
                            <option value={3}>Smartphones</option>
                            <option value={4}>Jogos</option>
                            <option value={5}>Eletrônicos</option>
                            <option value={6}>Decorações</option>
                            <option value={7}>Roupas</option>
                        </select>
                    </div>
                </div>

                <div className={style.description__content}>
                    <label className={style.base__headline} htmlFor="product_description">Descrição do Produto</label>
                    <textarea id={"product_description"} name={"product_description"} className={style.product__input}/>
                    {data?.schemaErrors?.product_description && <p className={style.error__message}>{data.schemaErrors.product_description}</p>}
                </div>


                <div className={style.product__info}>
                    <div className={style.info__left}>
                        <div className={style.image__content}>
                            <img className={`${imageSrc ? style.uploaded__image : style.placeholder__image}`} src={imageSrc ? imageSrc : background} alt="Imagem"/>
                            <div className={style.upload__submit}>
                                <label className={style.upload__input} aria-label={"Enviar foto do produto"}
                                       htmlFor="upload__input"><img className={style.eraser__img} src={eraser}
                                                                    alt={"Enviar imagem"}/></label>
                                <input onChange={(e) => handleFileChange(e)} name={"product_image"} id={"upload__input"} type={"file"} accept={"image/png"}/>
                            </div>
                            <p className={style.image__text}>Coloque uma imagem para seu produto</p>
                        </div>

                        <div className={style.price__amount}>
                            <h1 className={style.base__headline}>Preço do Produto sem Desconto</h1>
                            <div className={style.product__price}>
                                <label className={style.sr__only} htmlFor="price_input">Preço do Produto sem Desconto</label>
                                <input name={"price_without_discount"} id={"price_input"} type="text" placeholder={"R$ 0,00"} className={style.price__input}/>
                            </div>
                            {data?.schemaErrors?.price_without_discount && <p className={style.error__message}>{data.schemaErrors.price_without_discount}</p>}
                        </div>
                    </div>

                    <div className={style.price__details}>
                        <div>
                            <h1 className={style.base__headline}>O produto tem desconto?</h1>
                            <div className={style.hasdiscount__container}>
                                <div className={style.hasdiscount__wrap}>
                                    <label className={`${style.label__choice} ${style.left__choice} ${ isDiscountSelected ? style.choice__yes : style.choice__no}`} htmlFor="discount_true">Sim</label>
                                    <input onClick={(e) => setIsDiscountSelected((prevState => {
                                        return !prevState;
                                    }))} id={"discount_true"} name={"discount_choice"} type={"radio"} value={"true"}
                                           className={style.choice__input}/>
                                </div>

                                <div className={style.hasdiscount__wrap}>
                                    <label className={`${style.label__choice} ${style.right__choice} ${ isDiscountSelected ? style.choice__no : style.choice__yes}`} htmlFor="discount_false">Não</label>
                                    <input onClick={(e) => setIsDiscountSelected((prevState => {
                                        return !prevState;
                                    }))} id={"discount_false"} name={"discount_choice"} type={"radio"} value={"false"}
                                           className={style.choice__input}/>
                                </div>

                            </div>
                        </div>

                        {isDiscountSelected && <div>
                            <h1 className={style.base__headline}>Quantidade de Desconto</h1>
                            <div className={style.discount__container}>
                                <label htmlFor="discount_percentage" className={style.sr__only}>Quantidade de
                                    Desconto</label>
                                <input name={"discount_percentage"} id={"discount_percentage"}
                                       type="number" placeholder={"0%"} className={style.discount__input}/>
                                {data?.schemaErrors?.discount_percentage && <p className={style.error__message}>{data?.schemaErrors.discount_percentage}</p>}
                            </div>
                        </div>}

                    </div>
                </div>


                <div className={style.create__submit}>

                    <button className={style.button__create}>Criar Publicação</button>
                </div>
            </Form>
        </section>
    );

}