document.addEventListener('DOMContentLoaded', function () {
    const app_ = firebase.app();
    const firestore_ = firebase.firestore();

    firestore_.collection("todos").onSnapshot(function (documents_) {
        app.todos = [];
        documents_.forEach(element => {
            var data = element.data();
            data.id = element.id;
            app.todos.push(data);
        });
        app.todos.sort(function (a, b) {
            return b.priority - a.priority;
        })
    })
    
    const submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const form = document.querySelector("#create");
        const elements = form.elements;
        if (elements["title"].value != "" && elements["description"].value != "") {
            firestore_.collection("todos").add({
                    title: elements["title"].value,
                    description: elements["description"].value,
                    category: elements["category"].value,
                    priority: elements["priority"].value,
                    status: 0,
                    user: "",
                })
                .then(function (resolve) {
                    console.log(resolve)
                })
                .catch(function (reject) {
                    console.log(reject)
                })
            form.reset();
            createModalInstance.close();
        } else {
            alert("You missed a field")
        }
    })
    document.querySelectorAll(".todo").forEach(function (element) {
        element.children.forEach(function (child) {
            child.addEventListener("change", function (event) {

            })
        })
    });
});