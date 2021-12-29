
//insira o account da loja
var account = "consulqa";
//inserir a appkey e apptoken da loija
var appkey = "x-vtex-api-appkey";
var apptoken = "x-vtex-api-apptoken";
var VtexIdclientAutCookie = "eyJhbGciOiJFUzI1NiIsImtpZCI6IkI5RkVDQTMzMUQ3MzgyM0Q2MjAyOENDMTNEMDcyODRFOTcxQUJDM0YiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJnYWJyaWVsX2NpbnRyYV9qdXNzaUB3aGlybHBvb2wuY29tIiwiYWNjb3VudCI6ImNvbnN1bHFhIiwiYXVkaWVuY2UiOiJhZG1pbiIsInNlc3MiOiI0NTVmMzNiYi0wZDdmLTRjZDctOTFmMC04M2YyNzUzNWMxNjIiLCJleHAiOjE2NDA4Njg4NTYsInVzZXJJZCI6IjMwODVmMDg0LWZiOWQtNDNmMC04NTQxLTFiNzY0ZGNjMTAzNCIsImlhdCI6MTY0MDc4MjQ1NiwiaXNzIjoidG9rZW4tZW1pdHRlciIsImp0aSI6IjM0NjRiZTNhLTQ5OGMtNDNlNC04YzU0LWQ5Mzk3ZGNlZDBhOSJ9.VtiYe3izIQYXFc4VUn__AZDNPiCmJEg5dQBzjyHMfIHt4sytQIa-zZPS3kAp3voldx-btpf_FH6INdCF-xf1jA"

//colocar as informações do usuario para cadastro ou update
var array = [
    {
        Id: "V5046662drtl-01"
    }
    ,
    {
        Id: "v40712404wrqa-01"
    }
    ,
    {
        Id: "v40712402wrqa-01"
    }
    ,
    {
        Id: "v40712379wrqa-01"
    }
    ,
    {
        Id: "v40712406wrqa-01"
    }
    ,
    {
        Id: "CNS-v251304049ccqa-01"
    },
    {
        Id: "3"
    }
];

//variaveis de retorno
var orderNotFound = [];
var orderFound = [];
var orderFoundNull = []



async function getOrder(orderId, index) {
    let urlUserGet = `https://${account}.myvtex.com/api/oms/pvt/orders/${orderId}`;
    try {
        const infoOrder = await fetch(`${urlUserGet}`, {
            method: "GET",
            crossDomain: !0,
            headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "VtexIdclientAutCookie": `${VtexIdclientAutCookie}`,
                "Content-Type": "application/json",
            }
        })
            .then(
                (response) => {
                    return response.json();
                }
            )
            .catch(
                (error) => {
                    console.error("error: ", error, orderId);
                }
            )
        return infoOrder;
    }
    catch (error) {
        console.error("index: " + index + ", order: " + orderId);
        console.error("error: ", error);
    }
    finally {
        console.log('Get user success')
    }
}

array.map(async (order, index) => {
    const response = await getOrder(order.Id, index)
    if (!response.marketingData) {
        if (response.error?.message === 'Order Not Found') {
            orderNotFound.push({ ...order, response })
        }
        else {
            orderFoundNull.push({ ...order, response })
        }
    }
    else if (response.marketingData.utmiPart != null) {
        orderFound.push({ ...order, response });
    }
    else if (response.marketingData.utmiPart === null) {
        orderFoundNull.push({ ...order, response })
    }
});

console.log("|--------------------------------------------------------------|");
console.info("Order que existe registro: ", orderFound);
console.log("|--------------------------------------------------------------|");
console.warn("Order que existe registro marketing = NULL: ", orderFoundNull);
console.log("|--------------------------------------------------------------|");
console.error("Order que não existe registro: ", orderNotFound);
console.log("|--------------------------------------------------------------|");


