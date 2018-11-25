var person = 0;
        var person1;
        var person2;
        var select;

        //Function to create a "dog" object
        function createObject() {
            var dog = new Object();
            this.breed = document.objectForm.breed.value;
            this.size = document.getElementById("size").value;
            this.isGood = document.getElementById("good").value;
            this.play = function () {
                this.status = "playing";
            }
            document.getElementById("displayObject").innerHTML = "Your dog is a " + this.size + " " + this.breed + ". It is " + this.isGood + "a good boy/girl.";
        }

        //function to create a person
        function Parents() {
            this.name = document.getElementById('name').value;
            this.gender = document.getElementById('gender').value;
            this.age = document.getElementById('age').value;
            this.profile = function () {
                return "Name: " + this.name + "<br>" +
                    "Gender: " + this.gender + "<br>" +
                    "Age: " + this.age + "<br>" +
                    "Favorite food: " + this.food + "<br>";
            }
            this.changeName = function (name) {
                this.name = name;
            }
        }

        //function to create an object with inheritance
        function addObject() {
            person += 1;
            if (person == 1) {
                person1 = new Parents();
                var btn = document.createElement("BUTTON");
                var t = document.createTextNode("Set " + person1.name + "'s favorite food");
                btn.appendChild(t);
                btn.addEventListener("click", function () {
                    persons(1);
                });
                document.getElementById('output4').appendChild(btn);
            }
            else if (person == 2) {
                person2 = new Parents();
                var btn = document.createElement("BUTTON");
                var t = document.createTextNode("Set " + person2.name + "'s favorite food");
                btn.appendChild(t);
                btn.addEventListener("click", function () {
                    persons(2);
                });
                document.getElementById('output2').appendChild(btn);
                document.getElementById('personInput').innerHTML = '';
                return;
            }
            document.getElementById('name').value = '';
            document.getElementById('gender').value = '';
            document.getElementById('age').value = '';
        }

        //function to pull up a person's details
        function persons(person) {
            select = person;
            if (person == 1) {
                document.getElementById('output').innerHTML = person1.profile();
            }
            else if (person == 2) {
                document.getElementById('output').innerHTML = person2.profile();
            }
            document.getElementById('foodSection').style.display = "block";
        }

        //function to save a person's favorite food
        function food() {
            if (select == 1) {
                person1.food = document.getElementById('food').value;
                document.getElementById('output').innerHTML = person1.profile();
            }
            else if (select == 2) {
                person2.food = document.getElementById('food').value;
                document.getElementById('output').innerHTML = person2.profile();
            }
            else {
                document.getElementById('output2').innerHTML = "Please create the person first!";
            }
            document.getElementById('food').value = "";
            document.getElementById('foodSection').style.display = "none";
        }