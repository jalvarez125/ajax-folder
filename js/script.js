$(document).ready(function () {
    const scheduleUrl = "https://jsonkeeper.com/b/CWXZ";

    $("#submitDay").click(function () {
        const selectedDay = $("#dayInput").val();
        const errorMessage = $("#error-message");
        const scheduleList = $("#scheduleList");

        errorMessage.text("");
        scheduleList.empty();

        if (!selectedDay) {
            errorMessage.text("Please select a valid day (A-G).");
            return;
        }

        $.ajax({
            url: scheduleUrl,
            method: "GET",
            success: function (data) {
                const filteredSchedule = data.schedule.filter(item => item.days.includes(selectedDay));

                if (filteredSchedule.length === 0) {
                    scheduleList.append('<tr><td colspan="5" class="text-center">No classes scheduled for this day</td></tr>');
                } else {
                    filteredSchedule.forEach(item => {
                        scheduleList.append(
                            `<tr>
                                <td>${item.period}</td>
                                <td>${item.time}</td>
                                <td>${item.class}</td>
                                <td>${item.teacher}</td>
                                <td>${item.room}</td>
                            </tr>`
                        );
                    });
                }
            },
            error: function () {
                errorMessage.text("Failed to load the schedule. Please try again later.");
            }
        });
    });
});
