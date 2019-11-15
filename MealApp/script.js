import Meal from "../meal.js";
let newjwt;
let useDatabase;
$(document).ready(() => {
    newjwt = '';
    useDatabase = true;
    renderlogin();
    google.charts.load('current', {
        'packages': ['corechart']
    });
    // google.charts.setOnLoadCallback(drawChart);


});



// signup=====================================================================================

export function rendersignup() {
    $('#root').empty();
    $('#root').append($(`    <div class='signuplogin'>    
    <h2 class='forms-title'>MealExpert Sign Up</h3>

    <div class='forms-body'>
        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input id='signup-username' class="input" type="text" placeholder="Input Username" value='' required>
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input id='signup-email' class="input" type="email" placeholder="Input Email" value="" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </div>
        </div>


        <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left">
                <input id='signup-password' class="input" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>


        <div class="field">
            <label class="label">Confirm Password</label>
            <p class="control has-icons-left">
                <input id='confirm' class="input" type="password" placeholder="Password" required>
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
            
        </div>



        <div class="field is-grouped">
            <div class="control">
                <button id='signup' class="button is-outlined is-link">SignUp</button>
            </div>
            <div class="control">
                <a class="redirect-login button is-text has-text-dark">Already have an account? Login In.</a>
            </div>
        </div>

        <div class='warning-cont'></div>
    </div></div>`));
}

export async function createUser(username, password, email) {
    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/create',
            data: {
                "name": username,
                "pass": password,
                "data": {
                    "email": email
                }
            }
        })

        return result;
    } catch (error) {
        $('.warning-cont').empty().append($(`<p class='has-background-danger has-text-white'>${error}. Use other usernames.</p>`));
        return 'error';
    }
}



export async function getUserStatus(jwt) {
    try {
        const result = await axios({
            method: 'get',
            url: 'http://localhost:3000/account/status',
            headers: {
                "Authorization": "Bearer " + jwt
            },
        })

        // console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

// createUser("namex","passx","xxx@x.com")
// loginUser("namex","passx")
// getUserStatus('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZXgiLCJkYXRhIjp7ImVtYWlsIjoieHh4QHguY29tIn0sImlhdCI6MTU3MTAwMzA0NiwiZXhwIjoxNTczNTk1MDQ2fQ._GVOTuIYfiOqWqQhu9J9CoC-k_moVKa4_HbuLx4wTVI');


export async function signUpOnClick() {
    let username = $('#signup-username').val();
    let email = $('#signup-email').val();
    let password = $('#signup-password').val();
    let password2 = $('#confirm').val();
    if (username == '' || email == '' || password == '' || password2 == '') {
        $('.warning-cont').empty().append('<p class="has-background-danger has-text-white">All fields must be filled</p>')
    } else if (password !== password2) {
        $('.warning-cont').empty().append('<p class="has-background-danger has-text-white">Your password does not match.</p>')
    } else {
        document.getElementById('confirm').setCustomValidity('');
        let createduser = await createUser(username, password, email);
        if (createduser != 'error' && createduser.data.status == "Successfully made account") {
            $('.forms-body').empty().append($(`<p class='has-background-success'><a class='redirect-login has-text-white'>You have signed up successfully!. Click to login!.</a></p>`))
        }
    }
}


$('input').on('change', () => {
    $('.warning-cont').empty();
})


$('body').on('click', '#signup', signUpOnClick);

$('body').on('click', '.redirect-login', renderlogin);
$('body').on('click', '.redirect-signup', rendersignup);


//login======================================================================================
export function renderlogin() {

    $('#root').empty();
    $('#root').append($(`  <div class='signuplogin'>  
        <h2 class='forms-title'>MealExpert Login</h3>

            <div class='forms-body'>
                <br>
                <br>

                <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left has-icons-right">
                        <input id='login-username' class="input" type="email" placeholder="Input Email" value="">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <p class="control has-icons-left">
                        <input id='login-password' class="input" type="password" placeholder="Password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button id='login' class="button is-outlined is-link">Login</button>
                    </div>
                    <div class="control">
                        <a class="button redirect-signup is-text has-text-dark">Don't have an account yet? Sign Up.</a>
                    </div>
                </div>


                <div class='warning-cont'></div>


                
            </div></div>`));

}

export async function loginUser(username, password) {
    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/account/login',
            data: {
                "name": username,
                "pass": password
            }
        })
        // console.log(result.data.jwt);
        return result;
    } catch (error) {
        $('.warning-cont').empty().append($(`<p class='has-background-danger has-text-white'>${error} Wrong username/password.</p>`));
        // console.log(error);
        return "error";
    }
}




export async function loginOnClick() {
    let username = $('#login-username').val();
    let password = $('#login-password').val();
    let loginreturn = await loginUser(username, password);

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = today.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    today = '' + year + month + day;
    let defaultdate = "" + year + "-" + month + "-" + day;

    if (loginreturn != 'error') {
        newjwt = loginreturn.data.jwt;
        await renderRecord(defaultdate, today);

    }

}


$('body').on('click', '#login', loginOnClick);


//record================================================================================================\
export async function renderRecord(defaultdate, today) {



    $('#root').empty();
    $('#root').append($(`
    <div class="menu">

    <ul class="menu-list">
        <li class='active has-text-weight-bold'><a id='record'>Record</a></li>
        <li><a>Planning</a></li>
        <li><a id='analysis'>Analysis</a></li>
    </ul>

</div>



<div class='container' id='appcont'>

<h3 class='title has-text-centered'>Meal Expert</h3>

<div id="selectdate" class="forms-body has-text-centered">
    <div class="field">
        <label class="label"> Select A Date to View Meals</label>
        <p class="control has-text-centered has-icons-left">
                <i class="fas fa-calendar-day"></i>
            <input id='dateinput' type="date" value=${defaultdate}>

        </p>

    </div>
</div>
   

    <div class='forms-body editform'>
    <div class="tabs is-centered">
  <ul>
    <li class='has-text-small is-active'><a id='database'>Use Database</a></li>
    <li class="has-text-small"><a id='own'>Create Your Own</a></li>
   

  </ul>
</div>

        <div class="field">
            <label class="label"> Add Consumed Food Item:</label>
            <p class="control has-icons-left">
                <input id='food' class="input" placeholder="Meal">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
            <div class='auto-cont'></div>
        </div>

        <div class="field">
            <label class="label"> Add Amount:</label>
            <p class="control has-icons-left">
                <input id='amount' class="input" placeholder="Amount in grams">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label"> Add Calories:</label>
            <p class="control has-icons-left">
                <input id='cal' class="input" placeholder="Calories">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="select field">
            <select id='type'>
                <option>breakfast</option>
                <option>lunch</option>
                <option>dinner</option>
                <option>other</option>
            </select>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button id='addmeal' class="button is-outlined is-link">Add</button>
            </div>
        </div>


    </div>

    <div id='rendercont'></div>
    <button id='exte'>Add External</button>
</div>`));




    await rendermeals(newjwt, today);
}


export async function rendermeals(jwt, date) {
    $('#rendercont').empty();
    let meals = await getMeals(jwt, date);
    let mealkeys = Object.keys(meals);
    let cont = $(`<div id='meal-table'></div>`)

    for (let i = 0; i < mealkeys.length; i++) {
        let onemeal = $(`<table class='${mealkeys[i]}'>
            <tr class="heading-table"><th>${mealkeys[i]}</th><td>calories</td><td>amount</td></tr></table>`);
        for (let j = 0; j < meals[mealkeys[i]].items.length; j++) {
            onemeal.append($(`<tr>
            <th>${meals[mealkeys[i]].items[j].food}</th>
            <td>${meals[mealkeys[i]].items[j].calorie} cal</td>
            <td>${meals[mealkeys[i]].items[j].amount} grams</td>
            </tr>`))
        }

        let adddelete = $(`<div class='${mealkeys[i]}-cont meals-cont'><button data-date=${date} data-meal=${mealkeys[i]} class=" deletemeal is-outlined button is-small is-dark">Delete</button></div>`);
        adddelete.append(onemeal);
        cont.append(adddelete);
    }



    $('#rendercont').empty().append(cont)
}

export async function getMeals(jwt, date) {
    try {
        const result = await axios({
            method: 'get',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + date,
        })
        // console.log(result.data.result);
        return result.data.result;
    } catch (error) {
        console.log(error);
    }
}


//new food object for a date type
export async function createMealRecord(jwt, date, type, food, amount, calorie) {
    let datekey = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    try {
        const result = await axios({
            method: 'post',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + datekey + '/' + type,
            data: {
                "data": {
                    items: [{
                        food,
                        calorie,
                        amount
                    }]
                }
            }

        })
        // console.log(result);
    } catch (error) {
        console.log(error);
    }


}

//use this one, does not override all
//add food object for a date type
export async function createAddMealRecord(jwt, date, type, food, amount, calorie) {
    try {
        const result = await axios({
            method: 'post',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + date + '/' + type + '/items',
            data: {
                "type": "merge",
                "data": [{
                    food,
                    calorie,
                    amount
                }],

            }

        })
        // console.log(result);
    } catch (error) {
        console.log(error);
    }

    rendermeals(jwt, date);
}


//use this one, does not override all
//add food object for a date type
export async function createAddMealRecordExt(jwt, date, type, food, amount, calorie, nutrients, foodid) {
    try {
        const result = await axios({
            method: 'post',
            headers: {
                "Authorization": "Bearer " + jwt
            },
            url: 'http://localhost:3000/user/record/' + date + '/' + type + '/items',
            data: {
                "type": "merge",
                "data": {
                    food,
                    calorie,
                    amount,
                    foodid,
                    nutrients
                },

            }

        })
        // console.log(result);
    } catch (error) {
        console.log(error);
    }

    rendermeals(jwt, date);
}




// $('body').on('click', '#addmeal', async () => {
//     createAddMealRecordExt(jwt, date, type, food, amount, calorie, nutrients, foodid)
//     let datearray = $('#dateinput').val().match(/[0-9]*/g);
//     let date = datearray.reduce(function reducer(acc, cur) {
//         return acc + cur;
//     }, "");
//     let food = $('#food').val();
//     let cal = $('#cal').val();
//     let am = $('#amount').val();
//     let type = $('#type option:selected').text();
//     createAddMealRecord(newjwt, date, type, food, am, cal);
//     // let meals = await getMeals(newjwt, 20191109);
//     // await rendermeals(newjwt, date);
// });

$('body').on('change', '#dateinput', async () => {
    let datearray = $('#dateinput').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    await rendermeals(newjwt, date);
});


export async function deleteWholeRecord(jwt) {
    let result = await axios({
        url: 'http://localhost:3000/user/record',
        headers: {
            "Authorization": "Bearer " + jwt
        },
        method: "delete",

    });
}
export async function deleteOneMeal(jwt, date, meal) {
    let result = await axios({
        url: 'http://localhost:3000/user/record/' + date + "/" + meal,
        headers: {
            "Authorization": "Bearer " + jwt
        },
        method: "delete",

    });
}


$('body').on('click', '.deletemeal', async (e) => {
    let date = e.target.dataset.date;
    let meal = e.target.dataset.meal;
    // console.log(date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8));
    await deleteOneMeal(newjwt, date, meal);
    await rendermeals(newjwt, date);

});


//=======================================================================================
//third party api   10 request per min
//edamam
//it has custom auto-complete function

export async function getAppid() {
    let result = await axios({
        method: 'get',
        url: "http://localhost:3000/public/appid",
    });
    return result.data.result;
}

export async function getKey() {
    let result = await axios({
        method: 'get',
        url: "http://localhost:3000/public/key",
    });
    return result.data.result;
}

//get food autocomplete
export async function getFoodAuto(food_item) {
    let key = await getKey();
    let appid = await getAppid();

    let result = await axios({
        method: 'get',
        url: "http://api.edamam.com/auto-complete",
        params: {
            app_id: appid,
            app_key: key,
            q: food_item,
        }
    });
    // console.log(result.data);
    return result.data;
}


//get food w/ nu
export async function getFoodExternal(food_item) {
    let key = await getKey();
    let appid = await getAppid();

    let result = await axios({
        method: 'get',
        url: "https://api.edamam.com/api/food-database/parser",
        params: {
            app_id: appid,
            app_key: key,
            ingr: food_item,
        }
    });
    console.log(result.data.parsed);
    return result.data.parsed;
}

//use this method for get nutrients--not finished yet
export async function getNutExternal(food_item) {
    let key = await getKey();
    let appid = await getAppid();

    let result = await axios({
        method: 'get',
        url: "https://api.edamam.com/api/food-database/nutrients",
        params: {
            app_id: appid,
            app_key: key,
            ingr: food_item,
        }
    });
    console.log(result);
    return result;
}

//autocomplete
$('body').on('keyup', '#food', async () => {
    // console.log($('#food').val());
    let fillarray = await getFoodAuto($('#food').val());
    let fill = $(`<div></div>`);
    if (fillarray.length != 0) {
        for (let i = 0; i < fillarray.length; i++) {
            fill.append($(`<p class='auto-item'> ${fillarray[i]}</p>`));
        }
    }

    $('#food').parents('.field').find('.auto-cont').empty().append(fill);

});



let nutr;
let fid;
let fname;
$('body').on('click', '.auto-item', async (e) => {
    fname = e.currentTarget.innerHTML;
    $('#food').val(e.currentTarget.innerHTML);
    $('.auto-cont').empty();
    let result = await getFoodExternal(fname);
    fid = result[0].food.foodId;
    nutr = result[0].food.nutrients;

    console.log(fid, nutr);

});

$('body').on('keyup', '#amount', async (e) => {
    let am = parseInt($('#amount').val());
    let cper100g = parseInt(nutr.ENERC_KCAL);
    $('#cal').val(Math.floor(am * cper100g / 100));
});

$('body').on('click', '#addmeal', async () => {

    let datearray = $('#dateinput').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    let food = $('#food').val();
    let cal = $('#cal').val();
    let am = $('#amount').val();
    let type = $('#type option:selected').text();
    // createAddMealRecord(newjwt, date, type, food, am, cal);
    createAddMealRecordExt(newjwt, date, type, food, am, cal, nutr, fid)
    // let meals = await getMeals(newjwt, 20191109);
    // await rendermeals(newjwt, date);
});


// testing

$('body').on('click', '#exte', async () => {
    // await getFoodExternal('california rolls');
    await deleteWholeRecord(newjwt);
    // await getAppid();
    // await getKey();

    // await getFoodAuto('ap');
});


//chars-----------------------------------------------------------------------
export function drawChart(dataArr) {

    //   let data = google.visualization.arrayToDataTable([
    //     ['Task', 'Hours per Day'],
    //     ['Work',     11],
    //     ['Eat',      2],
    //     ['Commute',  2],
    //     ['Watch TV', 2],
    //     ['Sleep',    7]
    //   ]);

    let data = google.visualization.arrayToDataTable(dataArr);


    let options = {
        title: 'Your Daily Nutritions/grams'
    };

    let chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);


}


//switch tabs--------------
$('body').on('click', '#analysis', () => {

    $('#analysis').parents('li').addClass('active');
    $('#analysis').parents('li').addClass('has-text-weight-bold');
    $('#record').parents('li').removeClass('active');
    $('#record').parents('li').removeClass('has-text-weight-bold');
    let defaultdate = $('#dateinput').val();
    $('#appcont').empty();

    // let today = new Date();
    // let year = today.getFullYear();
    // let month = today.getMonth() + 1;
    // if (month < 10) {
    //     month = '0' + month;
    // }
    // let day = today.getDate();
    // if (day < 10) {
    //     day = '0' + day;
    // }
    // today = '' + year + month + day;
    // ldefaultdate = "" + year + "-" + month + "-" + day;

    $('#appcont').append($(`
    <h3 class='title has-text-centered'>Meal Expert</h3>

    <div id="selectdate" class="forms-body has-text-centered">
        <div class="field">
            <label class="label"> Select A Date to View Meals</label>
            <p class="control has-text-centered has-icons-left">
                    <i class="fas fa-calendar-day"></i>
                <input id='dateinputAnal' type="date" value=${defaultdate}>

            </p>

        </div>
    </div>
    
    <div id='nutrtablecont'></div>
    `));
    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");


    renderOneDayAnalysis(date);


});

$('body').on('click', '#record', () => {
    
    $('#analysis').parents('li').removeClass('active');
    $('#analysis').parents('li').removeClass('has-text-weight-bold');
    $('#record').parents('li').addClass('active');
    $('#record').parents('li').addClass('has-text-weight-bold');
    let defaultdate = $('#dateinputAnal').val();
    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    $('#appcont').empty();
    $('#piechart').html("");
    renderRecord(defaultdate, date);


});

let conv = {
    "CA": 1000,
    "CHOCDF": 1000000,
    "CHOLE": 1000,
    "FAMS": 1000000,
    "FAPU": 1000000,
    "FASAT": 1000000,
    "FAT": 1000000,
    "FATRN": 1000000,
    "FE": 1000,
    "FIBTG": 1000000,
    "FOLDFE": 1,
    "K": 1000,
    "MG": 1000,
    "NA": 1000,
    "NIA": 1000,
    "P": 1000,
    "PROCNT": 1000000,
    "RIBF": 1000,
    "SUGAR": 1000000,
    "THIA": 1000,
    "TOCPHA": 1000,
    "VITA_RAE": 1,
    "VITB12": 1,
    "VITB6A": 1000,
    "VITC": 1000,
    "VITD": 1,
    "VITK1": 1,
    "ENERC_KCAL": 1
}

let convN = {
    "CA": "Calcium",
    "CHOCDF": "Carbs",
    "CHOLE": "Cholesterol",
    "FAMS": "Monounsaturated",
    "FAPU": "Polyunsaturated",
    "FASAT": "Saturated",
    "FAT": "Fat",
    "FATRN": "Trans",
    "FE": "Iron",
    "FIBTG": "Fiber",
    "FOLDFE": "Folate ",
    "K": "Potassium	",
    "MG": "Magnesium",
    "NA": "Sodium",
    "NIA": "Niacin/B3",
    "P": "Phosphorus",
    "PROCNT": "Protein",
    "RIBF": "Riboflavin/B2",
    "SUGAR": "Sugars",
    "THIA": "Thiamin/B1",
    "TOCPHA": "Vitamin E",
    "VITA_RAE": "Vitamin A",
    "VITB12": "Vitamin B12",
    "VITB6A": "Vitamin B6",
    "VITC": "Vitamin C",
    "VITD": "Vitamin D",
    "VITK1": "Vitamin K",
}

export async function renderOneDayAnalysis(date) {
    $('#nutrtablecont').empty();
    $('#piechart').html("");
    let meal = await getMeals(newjwt, date);
    console.log(meal);

    let nudic = {};
    //   let nkarr=;
    let mealkeys = Object.keys(meal);
    for (let i = 0; i < mealkeys.length; i++) {
        for (let j = 0; j < meal[mealkeys[i]].items.length; j++) {
            let item = meal[mealkeys[i]].items[j];
            let amt = item.amount;
            let nutrs = item.nutrients;
            // console.log(nutrs);
            let nutkeys = Object.keys(nutrs);

            for (let a = 0; a < nutkeys.length; a++) {
                if (Object.keys(nudic).includes(nutkeys[a])) {
                    nudic[nutkeys[a]] = nudic[nutkeys[a]] + parseInt(nutrs[nutkeys[a]]) * amt * conv[nutkeys[a]] / 100;
                } else {
                    nudic[nutkeys[a]] = parseInt(nutrs[nutkeys[a]]) * amt * conv[nutkeys[a]] / 100;
                }
            }


        }
    }

    let dataArr = [];
    dataArr.push(['nutrient', 'cnt']);
    for (let i = 0; i < Object.keys(nudic).length; i++) {
        if (Object.keys(nudic)[i] != "ENERC_KCAL") {
            dataArr.push([convN[Object.keys(nudic)[i]], nudic[Object.keys(nudic)[i]] / 1000000]);
        }
    }

    //  console.log(dataArr);

    drawChart(dataArr);

    dataArr.push(['Calories', nudic['ENERC_KCAL']]);

    drawtable(dataArr);

}

export function drawtable(dataArr) {

    let table = $(`<table class='nutrtable'>
    <tr class="heading-table"><th>Nutrients</th><td>Total Amount</td></tr></table>`);
    for (let j = 1; j < dataArr.length; j++) {
        table.append($(`<tr>
    <th>${dataArr[j][0]}</th>
    <td>${dataArr[j][1]}</td>
    </tr>`))
    }
    $('#nutrtablecont').empty().append(table);
}


$('body').on('change', '#dateinputAnal', async () => {

    let datearray = $('#dateinputAnal').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    await renderOneDayAnalysis(date);
});



$('body').on('click','#own',()=>{
    // console.log( $('#own').parents('li'));
    $('#own').parents('li').addClass('is-active');
    $('#database').parents('li').removeClass('is-active');
    let defaultdate = $('#dateinput').val();
    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    renderRecordOwn(defaultdate, date);
    $('#own').parents('li').addClass('is-active');
    $('#database').parents('li').removeClass('is-active');
});

$('body').on('click','#database',()=>{
    // console.log( $('#own').parents('li'));
    $('#own').parents('li').removeClass('is-active');
    $('#database').parents('li').addClass('is-active');
    let defaultdate = $('#dateinput').val();
    let datearray = defaultdate.match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    renderRecord(defaultdate, date);
    $('#own').parents('li').removeClass('is-active');
    $('#database').parents('li').addClass('is-active');
    
});


export async function renderRecordOwn(defaultdate, today) {



    $('#root').empty();
    $('#root').append($(`
    <div class="menu">

    <ul class="menu-list">
        <li class='active has-text-weight-bold'><a id='record'>Record</a></li>
        <li><a>Planning</a></li>
        <li><a id='analysis'>Analysis</a></li>
    </ul>

</div>



<div class='container' id='appcont'>

<h3 class='title has-text-centered'>Meal Expert</h3>

<div id="selectdate" class="forms-body has-text-centered">
    <div class="field">
        <label class="label"> Select A Date to View Meals</label>
        <p class="control has-text-centered has-icons-left">
                <i class="fas fa-calendar-day"></i>
            <input id='dateinput' type="date" value=${defaultdate}>

        </p>

    </div>
</div>
   

    <div class='forms-body editform'>
    <div class="tabs is-centered">
  <ul>
    <li class='has-text-small is-active'><a id='database'>Use Database</a></li>
    <li class="has-text-small"><a id='own'>Create Your Own</a></li>
   

  </ul>
</div>

        <div class="field">
            <label class="label"> Add Consumed Food Item:</label>
            <p class="control has-icons-left">
                <input id='food2' class="input" placeholder="Meal">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
            <div class='auto-cont'></div>
        </div>

        <div class="field">
            <label class="label"> Add Amount:</label>
            <p class="control has-icons-left">
                <input id='amount2' class="input" placeholder="Amount in grams">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label"> Add Calories:</label>
            <p class="control has-icons-left">
                <input id='cal2' class="input" placeholder="Calories">
                <span class="icon is-small is-left">
                    <i class="fas fa-utensils"></i>
                </span>
            </p>
        </div>

        <div class="field">
        <label class="label"> Add Carbs:</label>
        <p class="control has-icons-left">
            <input id='carb2' class="input" placeholder="Carb">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="field">
        <label class="label"> Add Fiber:</label>
        <p class="control has-icons-left">
            <input id='fiber2' class="input" placeholder="Fiber">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="field">
        <label class="label"> Add Protein:</label>
        <p class="control has-icons-left">
            <input id='protein2' class="input" placeholder="Protein">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="field">
        <label class="label"> Add Fat:</label>
        <p class="control has-icons-left">
            <input id='fat2' class="input" placeholder="Fat">
            <span class="icon is-small is-left">
                <i class="fas fa-utensils"></i>
            </span>
        </p>
        </div>

        <div class="select field">
            <select id='type'>
                <option>breakfast</option>
                <option>lunch</option>
                <option>dinner</option>
                <option>other</option>
            </select>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button id='addmeal2' class="button is-outlined is-link">Add</button>
            </div>
        </div>


    </div>

    <div id='rendercont'></div>
    <button id='exte'>Add External</button>
</div>`));




    await rendermeals(newjwt, today);
}

$('body').on('click', '#addmeal2', async () => {
    let datearray = $('#dateinput').val().match(/[0-9]*/g);
    let date = datearray.reduce(function reducer(acc, cur) {
        return acc + cur;
    }, "");
    let food = $('#food2').val();
    let cal = $('#cal2').val();
    let am = $('#amount2').val();
    let carb=$('#carb2').val();
    let fat=$('#fat2').val();
    let protein=$('#protein2').val();
    let fiber=$('#fiber2').val();
    let nu={'FAT':parseInt(fat), 'FIBTG':parseInt(fiber),'PROCNT':parseInt(protein),'CHOCDF':parseInt(carb)};
    let id='none';
    let type = $('#type option:selected').text();
    console.log(nu);
    createAddMealRecordExt(newjwt, date, type, food, am, cal, nu, id);
    // let meals = await getMeals(newjwt, 20191109);
    // await rendermeals(newjwt, date);
});


