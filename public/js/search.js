$("#search").click(function () {
    var searchText = $("#searchText").val();
    $("#search").attr('href', `/search?search=${searchText}`);
    //console.log(searchText);
})