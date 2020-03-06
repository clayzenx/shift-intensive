<script>
  import { uLogged } from "../store.js";
  import { dealList } from "../store.js";
  import { user } from "../store.js";

  function showDescription(event) {
    if (
      $dealList[event.target.closest(".deal-item").dataset.item]
        .descriptionVisible === false
    ) {
      $dealList[
        event.target.closest(".deal-item").dataset.item
      ].descriptionVisible = true;
    } else {
      $dealList[
        event.target.closest(".deal-item").dataset.item
      ].descriptionVisible = false;
    }
  }

  function aceptDeal(event) {
    let task = $dealList[event.target.closest(".description").dataset.id];
    task.taskStatus = 1;
    task.descriptionVisible = false;

    $dealList = [...$dealList];
  }
</script>

<style>
  .deal-item {
    padding: 10px;
    background-color: white;
    box-shadow: rgb(199, 199, 199) 0px 0px 10px;
    transition: 500ms;
    margin-top: 10px;
  }
  .deal-item:hover {
    background-color: #fff2f1;
  }
  .price {
    text-align: end;
  }
  .date {
    color: rgb(172, 172, 172);
    font-style: normal;
  }
  .green {
    color: rgb(145, 214, 177);
  }
  .deal-item {
    height: 40px;
    position: relative;
  }
  .round-button {
    position: absolute;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-color: white;
    box-shadow: rgb(199, 199, 199) 0px 0px 5px;
    top: 0px;
    left: -20px;
  }
  .round-button:hover {
    background-color: #f37266;
  }
  .round-button > i {
    color: black;
    margin-top: 0.8em;
    margin-left: 0.9em;
  }

  .description {
    position: relative;
    border: 1px solid rgb(199, 199, 199);
    background-color: white;
    padding: 0.5em;
    box-shadow: rgb(199, 199, 199) 0px 3px 5px;
  }

  .button-acept {
    position: absolute;
    color: black;
    right: 20px;
    top: 20px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-color: white;
    box-shadow: rgb(199, 199, 199) 0px 0px 5px;
  }
  .button-acept > i {
    margin-top: 0.8em;
    margin-left: 0.8em;
  }
  .button-acept:hover {
    background-color: rgb(145, 214, 177);
    color: white;
  }
</style>

{#if $uLogged}
  {#each $dealList as deal, i}
    {#if deal.taskStatus === 0}
      <div data-item={i} class="deal-item row justify-content-between pt-2">
        <div class="round-button" on:click={showDescription}>
          <i class="fas fa-angle-down" />
        </div>
        <div class="col-6">{deal.taskName}</div>
        <div class="col-4 date">
          {deal.creationDate} / {deal.completionDate}
        </div>
        <div class="col-2 price">
          {deal.taskCost}
          <i class="fas fa-arrow-up green" />

        </div>
      </div>
      {#if deal.descriptionVisible}
        <div class="description row" data-id={i}>
          <div class="col-12 description-text">
            <i class="date">Описание</i>
            <p>{deal.taskDescription}</p>
          </div>
          {#if deal.ownerId !== $user.id}
            <div class="button-acept" on:click={aceptDeal}>
              <i class="fas fa-check" />
            </div>
          {/if}
        </div>
      {/if}
    {/if}
  {/each}
{/if}
