import style from "./style.module.scss";
import {LogoDisplay} from "~/components/LogoDisplay";
import RegisterInitialArea from "./RegisterInitialArea";
import {RegisterFinalArea} from "~/components/RegisterArea/RegisterFinalArea";
import {useState} from "react";


export default function RegisterArea() {
    const [needsAnimation, setNeedsAnimation] = useState(true);


    return (
        <main className={style.main__page}>
            <div className={style.register__container}>
                <LogoDisplay/>
                {
                    // needsAnimation ? <RegisterInitialArea  needsAnimation={needsAnimation}
                    //    setNeedsAnimation={setNeedsAnimation}/> :
                     <RegisterFinalArea setNeedsAnimation={setNeedsAnimation}/>
                }
            </div>
        </main>
    )
}