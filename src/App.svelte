<script lang="ts">
  import { collapseAll, executeCode, githubTransformJiraLink,  getSprints, toggleSprint, hideAllSprints, expandAll } from './lib/jira'
  let sprints = [{ name: 'Sprint', isHidden: true }, { name: '#demo#', isHidden: false }];
  let filterText = '';

  githubTransformJiraLink()

  getSprints().then(result => {
    sprints = result
  })

  const onClickHideAll = () => {
    hideAllSprints()
      .then(() => getSprints())
      .then(result => {
        sprints = result
      })
  }

  const onClickToggle = (name) => () => {
    toggleSprint(name).then(() => getSprints()).then(result => {
      sprints = result
    })
  }
</script>


<main>
  <h1>Jira Plugin</h1>
  <div class="content">
    <div>
      <button on:click={collapseAll}>Collapse All</button>
      <button on:click={onClickHideAll}>Hide All</button>
      <button on:click={expandAll}>Expand All</button>
    </div>
    <input bind:value={filterText} placeholder="Filter sprints..." />
    <span style="font-weight: bold; font-size: 23px;">Sprints</span>
    <div class="list">
      {#each sprints.filter(sprint => sprint.name.toLowerCase().includes(filterText.toLowerCase())) as sprint}
      <p style="margin-top: 6px;display:flex;align-items: center;gap:8px;">
        <span style={sprint.isHidden ? "flex:1": "flex:1;font-weight:bold"}>{sprint.name}</span>
        <button on:click={onClickToggle(sprint.name)}>{sprint.isHidden? "show" : "hide"}</button>
      </p>
      {/each}
    </div>
  </div>
</main>


<style>
  h1 {
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
    padding: 4px;
    color: white;
    background-color: #0747a6;
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 400px;
    height: 600px;
    overflow: auto;
    background-color: white;
  }

  button {
    background-color: rgba(9, 30, 66, .08);
    border: 1px solid transparent;
    color: #344563;
    box-sizing: border-box;
    transition: background-color .1s ease-out;
    border-radius: 3.01px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-variant: normal;
    font-weight: 400;
    text-decoration: none;
    display: inline-block;
    height: 2.14285714em;
    line-height: 1.42857143em;
    margin: 0;
    padding: 4px 10px;
    vertical-align: baseline;
    white-space: nowrap;
  }

  button:hover {
    background-color: rgba(9, 30, 66, .13);
    border-color: transparent;
    color: #344563;
    text-decoration: none;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 12px;
    flex: 1;
    overflow: auto;
    gap: 14px;
  }

  input {
    -webkit-border-radius: 3px 3px 3px 3px;
    border-radius: 3px 3px 3px 3px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ccc;
    font-size: 14px;
    line-height: 1;
    height: 30px;
    max-width: none;
    padding: 5px 24px 5px 5px;
    -moz-transition: width 100ms ease-in-out;
    -ms-transition: width 100ms ease-in-out;
    -webkit-transition: width 100ms ease-in-out;
    transition: width 100ms ease-in-out;
  }
</style>
