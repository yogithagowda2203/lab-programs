let tasks = [];

function addTask ()
{
    const input = document.querySelector( "#taskInput" );
    const text = input.value.trim();
    if ( text === "" ) return;

    tasks.push( { id: Date.now(), text, completed: false } );
    input.value = "";
    renderTasks();
}

function deleteTask ( id )
{
    tasks = tasks.filter( t => t.id !== id );
    renderTasks();
}

function toggleComplete ( id )
{
    const task = tasks.find( t => t.id === id );
    if ( task ) task.completed = !task.completed;
    renderTasks();
}

function editTask ( id )
{
    const task = tasks.find( t => t.id === id );
    if ( !task ) return;
    const newText = prompt( "Edit task:", task.text );
    if ( newText && newText.trim() !== "" )
    {
        task.text = newText.trim();
        renderTasks();
    }
}

function renderTasks ()
{
    const list = document.querySelector( "#taskList" );
    const count = document.querySelector( "#taskCount" );

    if ( tasks.length === 0 )
    {
        list.innerHTML = '<p class="empty-msg">No tasks yet. Add one above!</p>';
        count.textContent = "0 tasks";
        return;
    }

    list.innerHTML = tasks.map( t => `
        <div class="task-item ${ t.completed ? 'completed' : '' }">
            <span>${ t.text }</span>
            <div class="actions">
                <button class="btn-complete" onclick="toggleComplete(${ t.id })">${ t.completed ? 'Undo' : 'Done' }</button>
                <button class="btn-edit" onclick="editTask(${ t.id })">Edit</button>
                <button class="btn-delete" onclick="deleteTask(${ t.id })">Del</button>
            </div>
        </div>
    `).join( "" );

    const completed = tasks.filter( t => t.completed ).length;
    count.textContent = `${ tasks.length } tasks (${ completed } completed)`;
}