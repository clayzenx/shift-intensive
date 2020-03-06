<script>
    import { uLogged } from '../store.js';
    import { dealList } from '../store.js'
    import { fly } from 'svelte/transition';
    import { user } from '../store.js';

    let modalVisible = false;
    

    function CreateDeal(event){
        event.preventDefault();
        let form = event.target.closest('form');
        let newDeal = {};

        newDeal.taskId = $dealList.length +1;
        newDeal.taskName = form.querySelector('input[name="name"]').value;
        newDeal.taskDescription = form.querySelector('textarea[name="description"]').value;

        let dateNow = new Date(Date.now());
        let dateIso = dateNow.toISOString();
        newDeal.creationDate = dateIso.slice(0,10).split('-').reverse().join('-');

        let dateFromForm = form.querySelector('input[name="comleteDate"]').value;
        newDeal.completionDate = dateFromForm.split('-').reverse().join('-');

        newDeal.perfomerId = 0;
        newDeal.taskCost = parseInt(form.querySelector('input[name="price"]').value);
        newDeal.taskStatus = 0;
        newDeal.descriptionVisible = false;
        newDeal.ownerId = $user.id;
        newDeal.taskPicture = '';
        
        $dealList = [...$dealList, newDeal];

        showProfileModal();      
        document.querySelector('.modal-background').style.display = 'none';
    }

    function deactiveDeel(event){
        let task = $dealList[event.target.closest('.description').previousElementSibling.dataset.item];
        task.taskStatus = 0;
        task.descriptionVisible = false;
        
        $dealList = [...$dealList];
    }

    function doneDeal(event){
        let task = $dealList[event.target.closest('.description').previousElementSibling.dataset.item];
        $user.balance += task.taskCost;

        $user = $user;

        $dealList = $dealList.splice(task.taskId,1);
    }

    function userLoggin(event){
        event.preventDefault();
        let form = event.target.closest('form');
        let name = form.querySelector('input[name="loggin"]').value
        $user.name = name;

        $uLogged = true;
    }

    function showProfileModal(node){
        document.querySelector('.modal-background').style.display = 'block';
        if(modalVisible === false){
            modalVisible = true;
        } else {
            modalVisible = false;
        }
    }
    
    function toggleModal(node){
        document.querySelector('.modal-background').style.display = 'none';
        modalVisible = false;
    }

    function dropDescription(event){
          if($dealList[event.target.closest('.deal-item').dataset.item].descriptionVisible === false){
            $dealList[event.target.closest('.deal-item').dataset.item].descriptionVisible = true;
          } else {
            $dealList[event.target.closest('.deal-item').dataset.item].descriptionVisible = false;
          }
          
    }
</script>


<style>
    :global(body){
        font-family: 'Nunito', sans-serif;
    }
    :global(.logo){
        width: 100px;
    }
    #avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid rgb(145, 214, 177);
        padding: 0;
        
    }
    #avatar > img {
        width: 47px;
        height: 47px;
        border-radius: 50%;
        margin: 0;
    }
    
    #profile{
        padding: 10px;
        background-color: white;
        box-shadow:rgb(199, 199, 199) 0px 0px 10px;
        transition: 500ms;
    }
    #profile:hover{
        box-shadow: rgb(199, 199, 199) 0px 0px 20px;;
        transform: scale(1.05);
    }
    .modal-background {
        display: none;
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgba(0,0,0,0.4); 
    }
    .modal-content{
        border:0;
        border-color: rgb(145, 214, 177);
        border-radius: 0px;
        background-color: white;
        margin-top: 124px;
    }
    #profile-header{
        padding: 30px;
        height: 90px;
        background-color: rgb(142, 221, 179);
    }
    #profile-header-avatar{
        border: 3px solid rgb(142, 221, 179); 
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: rgb(142, 221, 179);
        padding: 2px;
    }
    #profile-header-avatar > img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
    }
    
    #profile-main-information{
        border: 5px solid rgb(142, 221, 179); 
        background-color: rgb(142, 221, 179); 
        text-align: center;
        height: min-content;
    }
    #header-profile-information{
        background-color:rgb(142, 221, 179);
        width: 50%;
        margin: 0 auto;
    }
    .info-bar{
        text-align: center;
        font-size: 2em;
        color: white; 
    }
    #quest-list{
        text-align: center;
    }
    h5{
        font-size: 1.5em;
        cursor: default;
    }
    h6{
        cursor: default;
    }
    .profile-text{
        color:white;
        font-style: normal;
        font-size: 1em;
        font-weight: bold;
    }
    .bold-profile-text{
        color:rgb(94, 138, 114);
        font-style: normal;
        font-size: 1em;    
    }
    .profile-header-text{
        color: white;
        padding-bottom: 5px;
        font-weight: bold;
    }
    .green{
        color:rgb(127, 185, 153);       
    }
    .red{
        color:#f37266;
    }
    .close-icon{
        font-size: 1.5em;
        color: rgb(94, 138, 114);
        cursor: pointer;
    }
    .close-icon:hover{
        color:rgb(47, 70, 57);
    }

    .deal-item{
        height: 25px;
        margin-top: 0.5em;
        background-color:rgb(142, 221, 179); 
        margin-top: 13px;
    }
    .round-button{
        position: relative;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        background-color:rgb(142, 221, 179);   
        border: 3px solid white;
        top: -125%;
        left: -5%;
    }
    
    .round-button:hover{
        background-color:rgb(94, 138, 114) ;
    }
    .round-button > i {
        color: white;
        margin-top: 0.6em;
    }
    .description{
        display: block;
        background-color: white;
        text-align: start;
        padding: 0.5em;
        border: 1px solid rgb(142, 221, 179); 
    }
    .modal-autorization-background{
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgba(0,0,0,0.4); 
    }

    #autorization-header{
        padding: 20px;
        height: 90px;
        background-color: rgb(142, 221, 179);
        margin-top: 124px;
    }
    #autorization-header-text{
        font-size: 2em;
        color: white;
        text-align: center;
    }
    #autorization-content{
        background-color: white;
    }
    .loggin-form{

        text-align: center;
    }


    label{
        color:rgb(94, 138, 114);
        font-style: normal;
        font-size: 1em;   
    }
    input[type="text"], input[type="password"]{
        border: 2px solid rgb(142, 221, 179);
        width: 170px;
    }
    input[type="text"]:focus, input[type="password"]:focus{
        border: 2px solid rgb(94, 138, 114);
    }
    input[type="submit"]{
        border: none;
        border-radius: 0;
        background-color: rgb(142, 221, 179);
        color:white;
        font-style: normal;
        font-size: 1em;
        font-weight: bold;
    }
    #creating-form{
        text-align: center;
    }
    textarea{
        border: 2px solid rgb(142, 221, 179);
    }
    .btn{
        text-align: center;
        font-size: 2em;
    }
</style>

{#if !$uLogged}
    <div class="modal-autorization-background">
        <div class="container" >
            <div class="row justify-content-center" id="autorization-header">
                <div class="col-12" id="autorization-header-text">
                    Авторизация
                </div>
            </div>
            <div class="row" id="autorization-content">
                <div class="col-12 mt-2 loggin-form">
                    <form>
                        <label class="green" for="">Авторизация</label>
                        <label for="loggin">Логин</label>
                        <input type="text" name="loggin" id="">
                        <label for="password">Пароль</label>
                        <input type="password" name="password" id="">
                        <br>
                        <input on:click={ userLoggin } type="submit" value="Войти">
                    </form>
                </div>        
            </div>
        </div>
    </div>
{:else}
<div on:click={showProfileModal} class="row align-items-center justify-content-between" id="profile">
    <div class="col-auto ml-2" id="avatar">
        <img src="../img/ava.jpg" alt="">
    </div>
    <div class="col-8" id='info'>
        <h5>{$user.name}</h5>
        <h6>Карма: {$user.balance} <i class="far fa-smile green"></i></h6>
    </div>
</div>
{/if}

<div class="modal-background">
    {#if modalVisible}
        <div transition:fly="{{ y: -100, duration: 500 }}" class="container modal-content">
            <div class="row justify-content-around" id="profile-header">
                <div class="col-auto ml-4" id="profile-header-avatar">
                    <img src="../img/ava.jpg" alt="">
                </div>
                <div class="col-8 info-bar">
                    <p>{$user.name}</p>
                </div>
                <div class="col-1">
                    <i class="fas fa-times close-icon" on:click={toggleModal}></i>
                </div>
            </div>
            <div class="row row justify-content-around mt-3 mb-3" id="profile-main">
                <div class="col-4">
                    <div class="mt-5" id="profile-main-information">
                        <div id="header-profile-information"><h6 class="profile-header-text">Статистика</h6></div>
                        <b class="bold-profile-text">Зарегестрирован(а)</b><br>
                        <i class="profile-text">{$user.registrationDate}</i><br>
                        <b class="bold-profile-text">Карма:</b>   
                        <i class="profile-text">{$user.balance} <i class="far fa-smile"></i> </i> 
                        
                    </div>
                    <div class="" id="creating-form">
                        <br>
                        <i class="profile-text green">Создать задание</i>
                        <form action="">
                            <label for="name">Название</label>
                            <input type="text" name="name" id="">
                            <label for="description">Описание</label>
                            <textarea name="description" id="1" cols="17" rows="3"></textarea>
                            <label for="completeDate">Выполнить до</label>
                            <input type="date" name="comleteDate" id="">
                            <label for="price">Цена</label>
                            <input type="text" name="price" id="">
                            <br>
                            <input on:click={CreateDeal} type="submit" value="Создать">
                        </form>
                    </div>
                </div>
                
                <div class="col-7 mt-3" id="quest-list">
                    <i class="profile-text green">Принятые дела</i><br>
                    {#each $dealList as deal, i}
                    {#if deal.taskStatus === 1}
                        <div class="deal-item" data-item={i}>
                            <i class="profile-text">{deal.taskName}</i>
                            <div class="round-button" on:click={dropDescription}>
                                <i class="fas fa-angle-down"></i>    
                            </div>
                        </div>
                        {#if deal.descriptionVisible}
                            <div class="description">
                                <p>{deal.taskDescription}</p>
                                <div class="row">
                                    <div on:click={doneDeal} class="btn green col-6"><i class="far fa-check-circle"></i></div>
                                    <div on:click={deactiveDeel} class="btn red col-6"><i class="far fa-times-circle"></i></div>
                                </div>
                            </div>
                        {/if}
                    {/if}
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>