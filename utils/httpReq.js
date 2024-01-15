/* The code snippet is defining two functions, `postData` and `getData`, and exporting them as part of
a module. */
const BASE_URL = 'https://fakestoreapi.com';


const postData = async (path, data) => {
    try {
        const response = await fetch(`${BASE_URL}/${path}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json", },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        alert("an error occurred!");
        console.log(error);
    }
}


const getData = async (path) => {
    try {
        const response = await fetch(`${BASE_URL}/${path}`)
        const json = await response.json();
        return json;
    } catch (error) {
        alert("an error occurred!");
    }
}
export { postData, getData };

