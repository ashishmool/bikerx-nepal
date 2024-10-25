<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Booking Confirmation</title>
</head>
<body>
<table width="600" style="font-family: Arial, Helvetica, sans-serif; font-size: 0.875rem; color: rgb(51, 51, 51);">
    <tr>
        <td>
            <div style="background-color: rgb(189, 9, 18); height: 8px; width: 30%; float: left;"></div>
            <div style="background-color: rgb(66, 93, 184); height: 8px; width: 70%; float: left;"></div>
        </td>
    </tr>
    <tr>
        <td style="padding: 32px 48px 0 48px;">
            <div style="float: left; margin-left: 16px;">
                <p style="color:rgb(189, 9, 18); font-size: 16px; font-weight: 600; margin-bottom: 8px; margin-top: 8px;">BikerXNepal</p>
                <p style="color:rgb(66, 93, 184); font-size: 14px; font-weight: 600; margin-top: 8px;">www.bikerxnepal.com.np</p>
            </div>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 48px;">
            <div style="margin-top: 4rem; font-weight: 600; margin-bottom: 1.5rem; font-size: 1rem">Hello,</div>
            <div>Thank you for your booking with BikerX Nepal! Here are your booking details:</div>
        </td>
    </tr>
    <tr>
        <td style="padding: 2rem 48px;">
            <table width="100%" style="background-color: rgb(246, 246, 246); padding: 1rem; font-size: 0.875rem;">
                <tr>
                    <td style="font-weight: 600; color: rgb(189, 9, 18);">Booking ID:</td>
                    <td>${purchaseId}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(66, 93, 184);">Tour ID:</td>
                    <td>${tourId}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(189, 9, 18);">User ID:</td>
                    <td>${userId}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(66, 93, 184);">Total Amount:</td>
                    <td>${totalAmount}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(189, 9, 18);">Payment Status:</td>
                    <td>${paymentStatus}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(66, 93, 184);">Start Date:</td>
                    <td>${startDate?string("yyyy-MM-dd")}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(189, 9, 18);">End Date:</td>
                    <td>${endDate?string("yyyy-MM-dd")}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(66, 93, 184);">Number of Persons:</td>
                    <td>${quantityPersons}</td>
                </tr>
                <tr>
                    <td style="font-weight: 600; color: rgb(189, 9, 18);">Bikes Booked (IDs):</td>
                    <td>
                        <#list bikeIds as bikeId>
                            ${bikeId}<#if bikeId_has_next>, </#if>
                        </#list>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 48px;">
            <div style="margin-top: 1rem; font-weight: 600; font-size: 1rem;">Important Information</div>
            <p style="color: rgb(153, 153, 153);">
                Please keep this email for your records. You will need it for any future reference or support requests.
                If you have any questions, feel free to reach out to our support team at <a href="mailto:bikerxnepal@gmail.com" style="color: rgb(26, 115, 232)">bikerxnepal@gmail.com</a>.
            </p>
        </td>
    </tr>
    <tr>
        <td style="background-color: rgb(66 93 184); padding: 1rem 0;">
            <table style="font-size: 0.75rem; color: rgb(255,255,255); width: 100%; text-align: center">
                <tr>
                    <td style="padding-bottom: 0.5rem">Copyright © 2024. All rights reserved.</td>
                </tr>
                <tr>
                    <td>BikerX Nepal Booking System</td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
