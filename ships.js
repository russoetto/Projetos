import fetch from 'node-fetch';

fetch('https://api.spacex.land/graphql/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: `{
      ships(find: {}) {
        active
        name
        missions {
          name
        }
      }
    }`})
})
.then(response => {
  response = response.json();
  if(!response || !response.data || !response.data.ships) {
    console.error('There was an error fetching the ships data.');
  } else {
    let ships = response.data.ships.filter(ship => ship.active);
    if (!ships.length) {
      console.log('There are currently no active ships.');
    } else {
      ships.forEach(ship => {
        console.log(`Ship Name: ${ship?.name}`);
        console.log('Missions:');
        ship?.missions?.forEach(mission => console.log(`  ${mission?.name}`));
        console.log();
      });
    }
  }
});