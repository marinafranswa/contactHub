var lightContainer = document.querySelector(".light-container");
var closeBtn = document.getElementById("closeBtn");
var cancelBtn = document.getElementById("cancelBtn");
var addContact = document.getElementById("addContact");
var saveContact = document.getElementById("saveContact");
var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddress = document.getElementById("emailAddress");
var contactAddress = document.getElementById("address");
var groupContact = document.getElementById("groupContact");
var contactNotes = document.getElementById("notes");
var contactImage = document.getElementById("contactImage");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var searchBar = document.getElementById("searchBar");

var contactList = [];
var currentIndex;
var favList = [];
var emergList = [];
addContact.addEventListener("click", function () {
  term = "add";
  openMenu();
});
function openMenu() {
  lightContainer.classList.remove("d-none");
}
function closeMenu() {
  lightContainer.classList.add("d-none");
}

closeBtn.addEventListener("click", function () {
  closeMenu();
});
cancelBtn.addEventListener("click", function () {
  closeMenu();
});
showScreen();
showHeading();
displayContact()
saveContact.addEventListener("click", function () {
  if (term == "add") {
    Swal.fire({
      title: "Added!",
      text: "contact has been added successfully",
      icon: "success",
      draggable: false,
    });
    setContactData("add");
  } else if (term == "update") {
    setContactData("update");
    Swal.fire({
      title: "Updated!",
      text: "contact has been updated successfully",
      icon: "success",
      draggable: false,
    });
  }
});
if (JSON.parse(localStorage.getItem("contactList")).length > 0) {
  contactList = JSON.parse(localStorage.getItem("contactList"));
  displayContact();
} else {
  contactList = [];
}

//add
function setContactData(term) {
  if (validateName() == false) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a name for the contact!",
    });
  } else if (validatePhone() == false) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please enter a phone number!",
    });
  } else if (validateGroup() == false) {
    Swal.fire({
      icon: "error",
      title: "Select Valid group",
    });
  }
  for (let i = 0; i < contactList.length; i++) {
    if (phoneNumber.value.includes(contactList[i].phone)) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${contactList[i].name}`,
      });
    }
  }

  if (
    validateName() == true &&
    validatePhone() == true &&
    validateGroup() == true
  ) {
    var contact = {
      name: fullName.value,
      phone: phoneNumber.value,
      email: emailAddress.value,
      address: contactAddress.value,
      group: groupContact.value,
      notes: contactNotes.value,
      image: contactImage.files[0]
        ? `images/${contactImage.files[0].name}`
        : ``,
      favorite: contactFavorite.checked,
      emergency: contactEmergency.checked,
    };
    term == "add"
      ? contactList.push(contact)
      : contactList.splice(currentIndex, 1, contact);

    localStorage.setItem("contactList", JSON.stringify(contactList));

    displayContact();
    closeMenu();
    clearContact();
  }
}
//searchbar
searchBar.addEventListener("input", function () {
  displayContact();
});
//3cols total/fav/emerg
function showScreen() {
  addFav();
  addEmerg();
  var cartona = `<div class="col">
              <div class="total bg-white border-radius-12 p-3 d-flex">
                <div
                  class="icon border-radius-12 d-flex justify-content-center align-items-center"
                >
                  <i class="fa-solid fa-users text-white"></i>
                </div>
                <div class="text ms-3">
                  <p
                    class="text-secondary text-uppercase small-text fw-medium my-0"
                  >
                    Total
                  </p>
                  <p class="text-dark fw-bold fs-4 my-0">${contactList.length}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="fav bg-white border-radius-12 p-3 d-flex">
                <div
                  class="icon border-radius-12 d-flex justify-content-center align-items-center"
                >
                  <i class="fa-solid fa-star text-white"></i>
                </div>
                <div class="text ms-3">
                  <p
                    class="text-secondary text-uppercase small-text fw-medium my-0"
                  >
                    favorites
                  </p>
                  <p class="text-dark fw-bold fs-4 my-0">${favList.length}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="emergency bg-white border-radius-12 p-3 d-flex">
                <div
                  class="icon border-radius-12 d-flex justify-content-center align-items-center"
                >
                  <i class="fa-solid fa-heart-pulse text-white"></i>
                </div>
                <div class="text ms-3">
                  <p
                    class="text-secondary text-uppercase small-text fw-medium my-0"
                  >
                    emergency
                  </p>
                  <p class="text-dark fw-bold fs-4 my-0">${emergList.length}</p>
                </div>
              </div>
            </div>`;
  document.getElementById("showScreen").innerHTML = cartona;
}
//title
function showHeading() {
  var cartona = `<h2 class="fw-bold mb-0">All Contacts</h2>
                <p class="text-secondary med-text">
                  Manage and organize your ${contactList.length} contacts
                </p>`;
  document.getElementById("heading").innerHTML = cartona;
}
//sidefav/emergency
function sideMenu() {
  var favoriteCartona = ``;
  var emergencyCartona = ``;

  if (favList.length > 0) {
    for (let i = 0; i < favList.length; i++) {
      favList[i];
      favoriteCartona += `
     <div class="col-12 col-md-6 col-xl-12">
       <div class="card border-radius-12 px-2 py-1 mb-2">
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <div class="d-flex gap-1 align-items-center">
                            <div
                              class="name-icon icon border-radius-12 d-flex justify-content-center align-items-center"
                            >
                              ${
                                favList[i].image
                                  ? `<img
                                   src=${favList[i].image}
                                   class="w-100 d-block object-fit-cover border-radius-12"
                                   alt=""
                                 />`
                                  : `<span class="d-block fw-semibold fs-5 text-white"
                                   >${favList[i].name.split("", 1).join(" ")}
                                   </span>`
                              }
                            </div>
                            <div>
                              <h3 class="mb-1 fw-semibold small-text">
                               ${favList[i].name}
                              </h3>
                              <p class="mb-0 gray-500 fw-medium smaller-text">
                               ${favList[i].phone}
                              </p>
                            </div>
                          </div>
                          <div
                            class="i-small rounded-2 d-flex justify-content-center align-items-center green-bg "
                          >
                          
                             <a href="tel:${
                               favList[i].phone
                             }" class="green-500">
                              <i class="fa-solid fa-phone"></i>
                              </a>
                          </div>
                        </div>
                      </div>
                      </div>`;
    }
  } else {
    favoriteCartona = `<p class="text-secondary text-center mb-2">No favorites Yet</p>`;
  }
  if (emergList.length > 0) {
    for (let i = 0; i < emergList.length; i++) {
      emergencyCartona += `
     <div class="col-12 col-md-6 col-xl-12">
       <div class="card border-radius-12 px-2 py-1 mb-2">
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <div class="d-flex gap-1 align-items-center">
                            <div
                              class="name-icon icon border-radius-12 d-flex justify-content-center align-items-center"
                            >
                                 ${
                                   emergList[i].image
                                     ? ` <img
                                   src=${emergList[i].image}
                                   class="w-100 d-block object-fit-cover border-radius-12"
                                   alt=""
                                 />`
                                     : `<span class="d-block fw-semibold fs-5 text-white"
                                   >${emergList[i].name.split("", 1).join(" ")}
                                   </span>`
                                 }
                            </div>
                            <div>
                              <h3 class="mb-1 fw-semibold small-text">
                               ${emergList[i].name}
                              </h3>
                              <p class="mb-0 gray-500 fw-medium smaller-text">
                               ${emergList[i].phone}
                              </p>
                            </div>
                          </div>
                          <div
                            class="i-small rounded-2 d-flex justify-content-center align-items-center green-bg green-500"
                          >
                              <a href="tel:${
                                emergList[i].phone
                              }" class="green-500">
                              <i class="fa-solid fa-phone"></i>
                              </a>
                          </div>
                        </div>
                      </div>
                      </div>`;
    }
  } else {
    emergencyCartona = `<p class="text-secondary text-center mb-2">No Emergencies Yet</p>`;
  }

  var cartona = `<div class="contacts-categories d-flex flex-column">
                <div class="fav-access my-2 card border-radius-12">
                  <div class="card-head p-3">
                    <div class="fav d-flex align-items-center gap-3">
                      <div
                        class="icon d-flex justify-content-center align-items-center border-radius-12"
                      >
                        <i class="fa-solid fa-star text-white med-text"></i>
                      </div>
                      <div>
                        <h3 class="mb-1 fw-bold fs-6">Favorites</h3>
                        <p
                          class="d-block d-xl-none mb-0 text-secondary fw-medium smaller-text"
                        >
                          Quick Access
                        </p>
                        <p
                          class="d-none d-xl-block mb-0 text-secondary fw-medium small-text"
                        >
                          Quick access to starred contacts
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card-body row g-2">
                    ${favoriteCartona}
                  </div>
                </div>
                <div class="emer-access my-2 card border-radius-12">
                  <div class="card-head p-3">
                    <div class="emergency d-flex align-items-center gap-3">
                      <div
                        class="icon d-flex justify-content-center align-items-center border-radius-12"
                      >
                        <i
                          class="fa-solid fa-heart-pulse text-white med-text"
                        ></i>
                      </div>
                      <div>
                        <h3 class="mb-1 fw-bold fs-6">Emergency</h3>
                        <p
                          class="d-block d-xl-none mb-0 text-secondary fw-medium smaller-text"
                        >
                          Urgent Contacts
                        </p>
                        <p
                          class="d-none d-xl-block mb-0 text-secondary fw-medium small-text"
                        >
                          Important contacts for urgent calls
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card-body row g-2">
                    ${emergencyCartona}
                  </div>
                </div>
              </div>`;

  document.getElementById("sideMenu").innerHTML = cartona;
}



//display function
function displayContact() {

  addFav();
  addEmerg();
  var cartona = ``;
  var groupCartona = ``;
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].group == "family") {
      groupCartona = `<span class="blue-bg blue-700 smaller-text fw-medium py-1 px-2 rounded-2"
                               >${contactList[i].group}</span
                             >`;
    } else if (contactList[i].group == "friends") {
      groupCartona = `<span class="green-bg green-500 smaller-text fw-medium py-1 px-2 rounded-2"
                               >${contactList[i].group}</span
                             >`;
    } else if (contactList[i].group == "work") {
      groupCartona = `<span class="purple-bg purple-500 smaller-text fw-medium py-1 px-2 rounded-2"
                               >${contactList[i].group}</span
                             >`;
    } else if (contactList[i].group == "school") {
      groupCartona = `<span class="amber-bg amber-500 smaller-text fw-medium py-1 px-2 rounded-2"
                               >${contactList[i].group}</span
                             >`;
    } else if (contactList[i].group == "other") {
      groupCartona = `<span class="gray-bg gray-500 smaller-text fw-medium py-1 px-2 rounded-2"
                               >${contactList[i].group}</span
                             >`;
    } else {
      groupCartona = ``;
    }
    if (
      contactList[i].name
        .toLowerCase()
        .includes(searchBar.value.toLowerCase()) ||
      contactList[i].phone.includes(searchBar.value) ||
      contactList[i].email.toLowerCase().includes(searchBar.value.toLowerCase())
    ) {
      cartona += ` <div class="col-12 col-md-6">
                       <div class="card border-radius-12">
                         <div class="card-body">
                           <div class="d-flex align-items-start gap-3">
                             <div class="position-relative">
                               <div
                                 class="name-icon icon border-radius-12 d-flex justify-content-center align-items-center"
                               >
                               ${
                                 contactList[i].image
                                   ? ` <img
                                   src=${contactList[i].image}
                                   class="w-100 d-block object-fit-cover border-radius-12"
                                   alt=""
                                 />`
                                   : `<span class="d-block fw-semibold fs-5 text-white"
                                   >${contactList[i].name
                                     .split("", 1)
                                     .join(" ")}
                                   </span>`
                               }
                                 
                               </div>
                               <div
                                 class="${
                                   contactList[i].favorite == true
                                     ? " "
                                     : "d-none"
                                 } position-absolute small-icon-fav d-flex justify-content-center align-items-center"
                               >
                                 <i class="fa-solid fa-star text-white"></i>
                               </div>
                               <div
                                 class="${
                                   contactList[i].emergency == true
                                     ? " "
                                     : "d-none"
                                 } position-absolute small-icon-emer d-flex justify-content-center align-items-center"
                               >
                                 <i class="fa-solid fa-heart-pulse text-white"></i>
                               </div>
                             </div>
                             <div>
                               <h3 class="fs-6 fw-semibold">${
                                 contactList[i].name
                               }</h3>
                               <div class="d-flex">
                                 <div
                                   class="blue-bg blue-500 i-small d-flex justify-content-center align-items-center rounded-2 me-2"
                                 >
                                   <i class="fa-solid fa-phone"></i>
                                 </div>
                                 <span class="text-secondary med-text"
                                   >${contactList[i].phone}</span
                                 >
                               </div>
                             </div>
                           </div>
                           <div class="mt-3">
                             <div class="d-flex gap-2 mb-2">
                               <div
                                 class="i-small purple-bg purple-500 d-flex justify-content-center align-items-center rounded-2"
                               >
                                 <i class="fa-solid fa-envelope"></i>
                               </div>
                               <span class="text-secondary med-text"
                                 >${contactList[i].email}</span
                               >
                             </div>
                             <div class="d-flex gap-2 mb-2">
                               <div
                                 class="i-small green-bg green-500 d-flex justify-content-center align-items-center rounded-2"
                               >
                                 <i class="fa-solid fa-map-marker-alt"></i>
                               </div>
                               <span class="text-secondary med-text"
                                 >${contactList[i].address}
                               </span>
                             </div>
                           </div>
                           <div class="flex gap-2 mb-2" id="groupCartona">
                         
                            ${groupCartona}
                            
                             <span
                               class="emergency-span ${
                                 contactList[i].emergency == true
                                   ? " "
                                   : "d-none"
                               } light-rose-bg rose-600 smaller-text fw-medium py-1 px-2 rounded-2"
                               ><i class="fa-solid fa-heart-pulse"></i>
                               Emergency</span
                             >
                           </div>
                         </div>
                         <div class="card-footer bellow">
                           <div class="d-flex justify-content-between">
                             <div class="d-flex gap-2">
                               <button
                                 class="btn green-btn med-text cont-btn rounded-3 light-green-bg green-500 d-flex justify-content-center align-items-center"
                               >
                                  <a href="tel:${
                                    contactList[i].phone
                                  }" class="green-500">
                              <i class="fa-solid fa-phone"></i>
                              </a>
                               </button>
                               <button
                                 class="btn purple-btn med-text cont-btn rounded-3 light-purple-bg purple-500 d-flex justify-content-center align-items-center"
                               >
                                <a href="mailto:${
                                  contactList[i].email
                                }" class="purple-500">
                                   <i class="fa-solid fa-envelope"></i>
                                </a>

                               </button>
                             </div>
                             <div class="d-flex gap-2">
                            
                               <button
                               id="favToggle"
                               onclick="favToggle(${i})"
                                 class="${
                                   contactList[i].favorite
                                     ? "light-amber-bg amber-400"
                                     : "light-gray-bg gray-500"
                                 } btn yellow-btn med-text cont-btn rounded-3  d-flex justify-content-center align-items-center"
                               >
                                 <i class="${
                                   contactList[i].favorite
                                     ? "fa-solid"
                                     : "fa-regular"
                                 } fa-star"></i>
                               </button>
                               <button
                               onclick="emergToggle(${i})"
                                 class="${
                                   contactList[i].emergency
                                     ? "light-rose-bg rose-500"
                                     : "light-gray gray-500"
                                 } btn rose-btn med-text cont-btn rounded-3  d-flex justify-content-center align-items-center"
                               >
                                 <i class="${
                                   contactList[i].emergency
                                     ? "fa-solid fa-heart-pulse"
                                     : "fa-regular fa-heart"
                                 } "></i>
                               </button>
                               <button
                              onclick="setUpData(${i}) "
                              
                                 class="btn edit-btn med-text cont-btn rounded-3 light-gray-bg gray-500 d-flex justify-content-center align-items-center"
                               >
                                 <i class="fa-solid fa-pen"></i>
                               </button>
                               <button
                                onclick="deleteContact(${i})"
                                 class="btn delete-btn med-text cont-btn rounded-3 light-gray-bg gray-500 d-flex justify-content-center align-items-center"
                               >
                                 <i class="fa-solid fa-trash"></i>
                               </button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>`;
    }
  }
  document.getElementById("rowData").innerHTML = cartona;
  sideMenu();
  showScreen();
  showHeading();
}

//clearContact function
function clearContact() {
  fullName.value = null;
  phoneNumber.value = null;
  emailAddress.value = null;
  contactAddress.value = null;
  groupContact.value = null;
  contactNotes.value = null;
  contactFavorite.checked = null;
  contactEmergency.checked = null;
}
//delete function
function deleteContact(index) {
  Swal.fire({
    title: "Delete contact?",
    text: `Are you sure you want to delete ${contactList[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      displayContact();
      localStorage.setItem("contactList", JSON.stringify(contactList));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
function setUpData(i) {
  term = "update";
  currentIndex = i;
  fullName.value = contactList[i].name;
  phoneNumber.value = contactList[i].phone;
  emailAddress.value = contactList[i].email;
  contactAddress.value = contactList[i].address;
  groupContact.value = contactList[i].group;
  contactNotes.value = contactList[i].notes;

  contactFavorite.checked = contactList[i].favorite;
  contactEmergency.checked = contactList[i].emergency;
  openMenu();
}
//adding the favs/emerg inside their array to get the number of them
function addFav() {
  favList = [];
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].favorite === true) {
      favList.push(contactList[i]);
    }
  }
}
function addEmerg() {
  emergList = [];
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].emergency === true) {
      emergList.push(contactList[i]);
    }
  }
}
//changing the fav/emergency
function favToggle(i) {
  if (contactList[i].favorite == false) {
    contactList[i].favorite = true;

    displayContact();
  } else {
    contactList[i].favorite = false;
    displayContact();
  }
  localStorage.setItem("contactList", JSON.stringify(contactList));
}
function emergToggle(i) {
  if (contactList[i].emergency == true) {
    contactList[i].emergency = false;

    displayContact();
  } else {
    contactList[i].emergency = true;
    displayContact();
  }
  localStorage.setItem("contactList", JSON.stringify(contactList));
}


//validation
function validateName() {
  var nameMessage = document.getElementById("nameMessage");
  var regex = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
  if (regex.test(fullName.value)) {
    fullName.classList.remove("red-border");
    nameMessage.classList.add("d-none");
    return true;
  } else {
    fullName.classList.add("red-border");
    nameMessage.classList.remove("d-none");
    return false;
  }
}
function validatePhone() {
  var phoneMessage = document.getElementById("phoneMessage");
  var regex = /^0?1[0125][0-9]{8}$/;
  if (regex.test(phoneNumber.value)) {
    phoneNumber.classList.remove("red-border");
    phoneMessage.classList.add("d-none");
    return true;
  } else {
    phoneNumber.classList.add("red-border");
    phoneMessage.classList.remove("d-none");
    return false;
  }
}
function validateEmail() {
  var emailMessage = document.getElementById("emailMessage");
  var regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  if (regex.test(emailAddress.value)) {
    emailAddress.classList.remove("red-border");
    emailMessage.classList.add("d-none");
    return true;
  } else {
    emailAddress.classList.add("red-border");
    emailMessage.classList.remove("d-none");
    return false;
  }
}

function validateGroup() {
  var regex = /^(family|friends|work|school|other)$/;
  if (regex.test(groupContact.value)) {
    return true;
  } else {
    return false;
  }
}
