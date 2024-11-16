import style from "../styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import menu from "~/assets/images/list.svg";
import pedro from "~/assets/images/pedro.webp";
import details from "~/assets/images/three-dots-vertical.svg";
import like from "~/assets/images/heart-svgrepo-com.svg";
import bookmark from "~/assets/images/bookmark.svg";
import bag from "~/assets/images/bag.svg";
import product from "~/assets/images/product_shirt.webp";
import search from "~/assets/images/search.svg";
import house from "~/assets/images/house.svg";
import bookmarks from "~/assets/images/bookmarks.svg";
import follows from "~/assets/images/follows.svg";
import woman1 from "~/assets/people/woman1.jfif";
import woman2 from "~/assets/people/woman2.jfif";
import man1 from "~/assets/people/man1.jfif";
import man2 from "~/assets/people/man2.jfif";
import unfollow from "~/assets/images/person-x-fill.svg";
import netshoes from "~/assets/images/netshoes-logo.png";
import smartphone from "~/assets/icons/phone.svg";
import piggy from "~/assets/icons/piggy-bank.svg";
import tree from "~/assets/icons/tree.svg"
import tv from "~/assets/icons/tv.svg";
import laptop from "~/assets/icons/laptop.svg";
import lamp from "~/assets/icons/lamp.svg";
import joystick from "~/assets/icons/joystick.svg";
import hearts from "~/assets/icons/hearts.svg";
import wishes from "~/assets/icons/bag-fill.svg";
import bookmarksFill from "~/assets/icons/bookmarks-fill.svg";
import houseFill from "~/assets/icons/house-fill.svg";
import eraser from "~/assets/icons/eraser-fill.svg"
import {Form, json, useActionData, useSubmit} from "@remix-run/react";
import {ActionFunction, ActionFunctionArgs} from "@remix-run/node";
import axios from "axios";
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";


export default function FeedPage() {
    const submit = useSubmit();
    const data = useActionData<typeof action>();


    return (
        <div className={style.page__container}>
            <section className={style.lateral__bar}>
                <ul className={style.bar__list}>
                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={search} alt="Buscar"/>
                        </button>

                        <p className={style.bar__text}>Buscar</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={houseFill} alt="Início"/>
                        </button>

                        <p className={style.bar__text}>Início</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={hearts} alt="Likes"/>
                        </button>

                        <p className={style.bar__text}>Meus Likes</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={wishes} alt="Desejos"/>
                        </button>

                        <p className={style.bar__text}>Lista de Desejos</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={bookmarksFill} alt="Salvos"/>
                        </button>

                        <p className={style.bar__text}>
                            Itens Salvos
                        </p>
                    </li>

                </ul>
            </section>

            <main className={style.feed__container}>
                <nav className={style.navbar__feed}>
                    <div className={style.feed__content}>
                        <div className={style.logo__content}>
                            <img className={style.logo__image} src={logo} alt={"Social Commerce"}/>
                            <h1 className={style.logo__name}>Social Commerce</h1>
                        </div>

                        <div className={style.content__search}>
                            <Form className={style.search__field}>
                                <input type="hidden" name={"_action"} value={"search"}/>
                                <label className={style.sr__only} htmlFor="search">O que você está buscando?</label>
                                <input className={`${style.standard__input} ${style.field__input}`} name={"search"}
                                       id={"search"} placeholder={"O que você está buscando?"}/>
                                <button aria-label={"buscar"} className={style.field__submit}></button>
                            </Form>

                            <menu className={style.search__menu}>
                                <button className={style.menu__button}><img className={style.button__image} src={menu}
                                                                            alt="Menu"/></button>
                            </menu>
                        </div>
                    </div>
                </nav>

                <section className={style.category__section}>
                    <h1 className={style.category__title}>Categorias</h1>
                    <div className={style.separation__div}></div>
                    <ul className={style.category__list}>
                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={piggy} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Maiores Ofertas</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={tree} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Natal</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={tv} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Televisores</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={smartphone} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Smartphones</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={joystick} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Jogos</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={laptop} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Eletrônicos</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={lamp} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Decorações</p>
                        </li>

                        <button className={style.carousel__right}></button>
                    </ul>
                </section>

                <section>
                    <div className={style.feed__choices}>
                        <div className={style.choice__followed}>
                            <p>Seguidos</p>
                            <div className={style.choice__indicator}></div>
                        </div>
                        <div className={style.choice__recommended}>
                            <p>Para você</p>
                        </div>
                    </div>

                    <div className={style.post__container}>
                        <fieldset className={style.post__field}>
                            <legend className={style.field__brand}>
                                <img className={style.brand__image} src={logo}/>
                                <span className={style.brand__name}>Eco-Friendly Water Bottle</span>
                            </legend>


                            <div className={style.post__details}>
                                <div className={style.post__date}>
                                    <p className={style.date__text}>54 Min</p>
                                </div>
                                <img className={style.post__extra} src={details} alt="detalhes"/>
                            </div>

                            <div className={style.separation__onpost}></div>

                            <div className={style.post__description}>
                                <p className={style.description__text}>Stay hydrated in style! Our sleek, sustainable
                                    water bottle is perfect for your active lifestyle. Made from recycled materials, it
                                    keeps your drinks cold for 24 hours or hot for 12. Join the eco-revolution! 🌿💧
                                    #EcoLiving #ZeroWaste</p>
                            </div>

                            <div className={style.post__product}>

                                <img className={style.product__image} src={product} alt=""/>
                                <span className={style.product__discount}>-10%</span>
                            </div>


                            <div className={style.post__reactions}>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={like} alt="gostar"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bag} alt="lista de desejos"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bookmark} alt="salvar"/>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <br/>

                    <div className={style.post__container}>
                        <fieldset className={style.post__field}>
                            <legend className={style.field__brand}>
                                <img className={style.brand__image} src={logo}/>
                                <span className={style.brand__name}>Social Commerce</span>
                            </legend>


                            <div className={style.post__details}>
                                <div className={style.post__date}>
                                    <p className={style.date__text}>54 Min</p>
                                </div>
                                <img className={style.post__extra} src={details} alt="detalhes"/>
                            </div>

                            <div className={style.separation__div}></div>

                            <div className={style.post__description}>
                                <p className={style.description__text}>🌟 Promoção imperdível! 🌟<br/><br/>

                                    Que tal renovar o guarda-roupa com estilo e ainda economizar?
                                    🤑 Todas as nossas camisetas estão com 10% de desconto! Isso mesmo, é a sua
                                    chance de garantir aquelas peças incríveis que você já estava de olho. <br/><br/>

                                    Mas corra, porque essa oferta é por tempo limitado!
                                    Aproveite e vista-se com o melhor da moda! 👕✨ <br/><br/>

                                    👉 Link na bio para conferir nossos modelos!🤔</p>
                            </div>

                            <div className={style.post__product}>
                                <img className={style.product__image} src={product} alt=""/>
                                <span className={style.product__discount}>-10%</span>
                            </div>


                            <div className={style.post__reactions}>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={like} alt="gostar"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bag} alt="lista de desejos"/>
                                </div>
                                <div className={style.reaction__container}>
                                    <img className={style.reaction__image} src={bookmark} alt="salvar"/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </section>

                <section className={style.user__features}>

                    <ul className={style.feature__list}>
                        <li className={style.feature__group}>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                     <img className={style.action__image} src={search} alt="buscar"/>
                                </button>
                            </div>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={house} alt="início"/>
                                </button>
                            </div>
                        </li>

                        <li className={`${style.feature__item} ${style.profile__item}`}>
                            <button className={style.feature__action}>
                                <img className={style.action__image} src={pedro} alt="início"/>
                                <p className={style.action__name}>Meu Perfil</p>
                            </button>
                        </li>

                        <li className={style.feature__group}>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={follows} alt="seguidos"/>
                                </button>
                            </div>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={bookmarks} alt="bookmarks"/>
                                </button>
                            </div>
                        </li>

                    </ul>

                </section>



            </main>


            <section className={style.user__container}>
                <div className={style.user__info}>
                    <img className={style.user__image} src={data ? data : logo} alt=""/>
                    <p className={style.user__name}>Pedro Pedrinho</p>
                    <Form onChange={(event) => {submit(event.currentTarget)}} encType={"multipart/form-data"} className={style.upload__image} method={"post"}>
                        <div className={style.upload__submit}>
                            <input type={"hidden"} name={"_action"} value={"upload_image"} />
                            <label className={style.upload__input} aria-label={"Enviar foto de perfil"} htmlFor="upload__input"><img src={eraser} alt={"Enviar imagem"} /></label>
                            <input name={"image"} id={"upload__input"} type={"file"} accept={"image/png"}/>
                        </div>
                    </Form>
                    <div className={`${style.separation__follows} ${style.separation__div}`}></div>
                </div>

                <div className={style.user__follows}>
                    <div className={style.follows__headline}>
                        <h1 className={style.follow__headline}>
                            Seguindo
                        </h1>
                    </div>

                    <ul className={style.follows__list}>
                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={woman1} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Phyllis Meredith</p>
                                    <p className={style.user__followers}>2639 Seguidores</p>
                                </div>

                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>

                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={man1} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Kevin Malone</p>
                                    <p className={style.user__followers}>58 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>
                        </li>

                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={woman2} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Pam Angela</p>
                                    <p className={style.user__followers}>715 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>

                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={man2} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Jim Halpert</p>
                                    <p className={style.user__followers}>115 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>
                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={netshoes} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Netshoes</p>
                                    <p className={style.user__followers}>25.495 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>


                    </ul>
                </div>
            </section>

        </div>

    );
}

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const _action = formData.get("_action");

    const baseUrl = "http://localhost:8080/";

    switch (_action) {
        case "search": {
            const response = await axios.get(baseUrl + "feed",
                { params:
                        {search: data.search}
                });

        }
        break;
        case "upload_image": {
            const image = formData.get("image") as File;

            if (!image) {
                return json({error:  "O arquivo não pode ser enviado"}, 400);
            }

            const uploadDir = path.join(process.cwd(), "public/000001");
            const filename = `${crypto.randomUUID()}-${Date.now()}-${image.name}`;
            const filePath = path.join(uploadDir, filename);

            fs.mkdirSync(uploadDir, {recursive: true});

            const arrayBuffer = await image.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

            const imageUrl = `/000001/${filename}`;

            return json(imageUrl);
        }
    }

    throw new Error("Teste so pra n bugar");
}