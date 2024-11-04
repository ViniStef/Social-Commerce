import RegisterInitialForm from "~/components/RegisterInitialForm";
import {useActionData} from "react-router";
import {json} from "@remix-run/node";


export default function RegisterPage() {
    const data = useActionData();
    console.log(data);
    return (
        <>
            <RegisterInitialForm/>
            <h1>Register Page!!</h1>
        </>
    )
}


export async function action( { request }: {request: Request}) {
    const formData = await request.formData();

    // Convert FormData to an object for easier logging
    const data = Object.fromEntries(formData);

    // Log the data to the server console
    console.log("Form data:", data);

    const response: Response = await fetch(`http://localhost:8080/buyer/findbuyer/${data.email}`, {
        method: "GET",
    })

    const jsonResponse = await response.json();

    console.log(jsonResponse);

    return jsonResponse;
}