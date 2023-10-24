package com.edsh.weblab2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;

@WebServlet(name = "controllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {

    public void init() {
        var userData = new HashMap<String, JSONArray>();
        getServletContext().setAttribute("userData", userData);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String command = request.getParameter("command");
        var writer = response.getWriter();
        var result = new JSONObject();
        if(command == null) {
            result.put("error", "Command argument is undefined");
            writer.println(result);
            return;
        }

        switch (command) {
            case "check" -> {
                request.getRequestDispatcher("/area-check").forward(request, response);
            }
            case "clear" -> {
                CookieHelper.getUserData(request).clear();
            }
            case "init" -> {
                result.put("entries", CookieHelper.getUserData(request));
            }
            default -> {
               result.put("error", "Unknown command");
            }
        }
        writer.println(result);
    }

}