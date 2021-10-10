<svelte:options tag="nav-bar"/>

<nav>
  <div class="title">PWALAND</div>
</nav>

<style>
  nav {
    height: 80px;
    background-color: rgb(77 61 146);
    padding: 0 20px;

  }

  @media (min-width: 640px) {
		nav {
      padding: 0 80px;
		}
	}

  .title {
    color: white;
    font-weight: 500;
    font-size: 25px;
    line-height: 80px;
  }
</style>