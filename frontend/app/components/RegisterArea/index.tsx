import style from "./style.module.scss";
import {LogoDisplay} from "~/components/LogoDisplay";
import RegisterInitialArea from "./RegisterInitialArea";
import {RegisterFinalArea} from "~/components/RegisterArea/RegisterFinalArea";
import {useState} from "react";
import {useActionData} from "@remix-run/react";
import {action} from "~/routes/register/route";


export default function RegisterArea() {
    const data = useActionData<typeof action>();
    const [needsAnimation, setNeedsAnimation] = useState(true);

    const invalidRegister = data?.emailResponse?.isEmailUsed === false || Boolean(data?.errors) || data?.data?.error;

    return (
        <main className={style.main__page}>
            <div className={style.register__container}>
                <LogoDisplay/>

                {
                    invalidRegister ? <RegisterFinalArea setNeedsAnimation={setNeedsAnimation}/>
                        : <RegisterInitialArea needsAnimation={needsAnimation}
                                               setNeedsAnimation={setNeedsAnimation}/>
                }


            </div>
        </main>
    )
}