$("#search").click(function () {
    var searchText = $("#searchText").val();
    $("#search").attr('href', `/adminSearch?search=${searchText}`);
    //console.log(searchText);
})