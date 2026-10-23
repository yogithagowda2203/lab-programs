async function fetchUsers ()
{
    const loading = document.getElementById( "loading" );
    const error = document.getElementById( "error" );
    const tbody = document.getElementById( "userBody" );

    // Show loading, hide previous results/errors
    loading.style.display = "block";
    error.style.display = "none";
    tbody.innerHTML = "";

    try
    {
        const response = await fetch( "https://jsonplaceholder.typicode.com/users" );

        if ( !response.ok )
        {
            throw new Error( `HTTP error: ${ response.status }` );
        }

        const users = await response.json();

        // Populate table
        users.forEach( user =>
        {
            const row = document.createElement( "tr" );
            row.innerHTML = `<td>${ user.id }</td><td>${ user.name }</td><td>${ user.email }</td><td>${ user.phone }</td>`;
            tbody.appendChild( row );
        } );

    } catch ( err )
    {
        error.style.display = "block";
        error.textContent = `Failed to load data: ${ err.message }`;
    } finally
    {
        loading.style.display = "none";
    }
}