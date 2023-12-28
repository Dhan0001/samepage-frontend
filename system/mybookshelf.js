import {
  backendURL,
  successNotification,
  getLoggedUser,
} from "../../../js/utils/utils.js";

getBooks();
async function getBooks() {
  const response = await fetch(backendURL + "/api/book", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (response.ok) {
    const json = await response.json();

    let container = "";
    json.forEach((element) => {
      const date = new Date(element.created_at).toLocaleString();

      container += `<div class="table-responsive-lg"">
                      <table class="table table-hover border text-center">
                          <thead>
                              <tr class="bg-dark">
                              <th scope="col" class="text-dark">${element.title}</th>
                              <th scope="col" class="text-dark">${element.author}</th>
                              <th scope="col" class="text-dark">${element.ISBN}</th>
                              <th scope="col" class="text-dark">${element.description}</th>
                              <th scope="col" class="text-dark">${element.publication_year}</th>
                            <img src="${backendURL}/storage/${element.image}" alt="Image" height = "250px" width = "250px">
                            <th scope="col" class="text-dark">${element.condition}</th>
                            <th scope="col" class="text-dark">${element.owner_facebook}</th>
                             <th scope="col" class="text-dark">${element.department_id}</th>
                              <th scope="col" class="text-dark">${element.status}</th>
                                                           
                              </tr>
                          </thead>
                          <tbody id="room-data">
                          </tbody>
                      </table>
                  </div>`;
    });

    document.getElementById("get_allbooks").innerHTML = container;

    // Add event listeners for any additional actions here
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

getLoggedUser();
// Submit Form Functionality; This is for Create and Update
const event_form = document.getElementById("event_form");

event_form.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#event_form button[type='submit']").disabled = true;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(event_form);

  // Fetch API Carousel Item Store Endpoint
  const response = await fetch(backendURL + "/api/book", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  if (response.ok) {
    const json = await response.json();

    console.log(json);

    event_form.reset();

    successNotification("Successfully added an Event!", 5);
  } else if (response.status == 422) {
    const json = await response.json();

    // Close Modal Form
    //document.getElementById("modal_close").click();

    //errorNotification(json.message, 10);
  }

  document.querySelector("#event_form button[type='submit']").disabled = false;
  document.querySelector("#event_form button[type='submit']").innerHTML =
    "Submit";
};
