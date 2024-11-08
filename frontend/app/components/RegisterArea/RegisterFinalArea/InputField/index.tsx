import style from "~/components/RegisterArea/RegisterFinalArea/style.module.scss";
import {Dispatch, SetStateAction, useContext, useEffect, useRef} from "react";
import {CurrentUserContext} from "~/routes/register";

interface InputProps {
    setIsAnyInvalid: Dispatch<SetStateAction<boolean>>;
    isRegisterClicked: boolean;
    labelText: string;
    autocomplete?: string;
    className: string;
    name: string;
    type?: string;
    id: string;
    placeholder: string;
}

export const InputField = ({ setIsAnyInvalid, isRegisterClicked, labelText, autocomplete="", className, name, type="text", id, placeholder}: InputProps) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isRegisterClicked && inputRef.current) {
            if (!isValidField(name, inputRef.current.value)) {
                setIsAnyInvalid(true);
            }
        }

    }, [isRegisterClicked])

    const isValidField = (field: string, value: string): boolean => {
        switch (field) {
            case "name":
                if (value.length >= 3) {
                    setCurrentUser(prevState => {
                        console.log(prevState);
                        return {...prevState, name: value};
                    })
                    return true;
                }
                setCurrentUser(prevState => {
                    return {...prevState, name: ""};
                })
                return false;
            case "surname":
                if (value.length >= 3) {
                    setCurrentUser(prevState => {

                        return {...prevState, surname: value};
                    })
                    return true;
                }
                setCurrentUser(prevState => {

                    return {...prevState, surname: ""};
                })
                return false;
            case "identifier":
                if (value.length >= 3) {
                    setCurrentUser(prevState => {

                        return {...prevState, identifier: value};
                    })
                    return true;
                }
                setCurrentUser(prevState => {
                    return {...prevState, identifier: ""};
                })
                return false;
            case "password":
                if (value.length >= 3) {
                    setCurrentUser(prevState => {
                        return {...prevState, password: value};
                    })
                    return true;
                }
                setCurrentUser(prevState => {
                    return {...prevState, password: ""};
                })
                return false;
            case "confirmPassword":
                // TO DO
                break;

        }

        return false;

    }

    return (
        <div className={style.field__container}>
            <label className={style.sr__only} htmlFor={id}>{labelText}</label>
            <input onChange={(e) => {console.log("oii")}} ref={inputRef} autoComplete={autocomplete} className={`${style[className]} ${style.standard__input}`} id={id}
                   name={name} type={type} placeholder={placeholder}/>
        </div>
    )

}