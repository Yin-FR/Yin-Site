import $ from "jquery";


type RestMethod = "GET" | "POST" | "PUT" | "DELETE"
export type DataReceived = string | object | Array<any>

const getDataFromAPI = (requestUrl: string, requestMethod: RestMethod, requestData?: JQuery.PlainObject,requestHeaders?:JQuery.PlainObject<string>): Promise<DataReceived> => {
  return new Promise((resolve, reject) => {

    $.ajax({
      url: requestUrl,
      method: requestMethod,
      headers: requestHeaders,
      data: requestData,
      dataType: "json",
      cache: false,
      success: (data: DataReceived) => {
        resolve(data)
      },
      error: (err) => {
        reject(err);
        console.log(err);
      }
    });

  });
}


export { getDataFromAPI };