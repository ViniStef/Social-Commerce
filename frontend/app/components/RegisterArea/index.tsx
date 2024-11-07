import style from "./style.module.scss";
import {LogoDisplay} from "~/components/LogoDisplay";
import RegisterInitialArea from "";


export default function RegisterArea() {

    return (
        <main className={style.main__page}>
            <div className={style.register__container}>
                <LogoDisplay />

                <RegisterInitialArea />

            </div>

        </main>
    )
}