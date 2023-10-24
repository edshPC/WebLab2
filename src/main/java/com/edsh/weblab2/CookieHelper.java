package com.edsh.weblab2;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.UUID;

public class CookieHelper {
    private CookieHelper(){}

    public static Cookie getCookie(HttpServletRequest request, String name) {
        for (Cookie cookie : request.getCookies()) {
            if(cookie.getName().equals(name)) return cookie;
        }
        return null;
    }

    public static boolean hasCookie(HttpServletRequest request, String name) {
        return getCookie(request, name) != null;
    }

    public static void setCookie(HttpServletResponse response, String name, String value) {
        response.addCookie(new Cookie(name, value));
    }

    public static JSONArray getUserData(HttpServletRequest request) {
        Cookie uuid = CookieHelper.getCookie(request, "uuid");
        if(uuid != null) {
            var userData = (HashMap<String, JSONArray>) request.getServletContext().getAttribute("userData");
            if(userData.containsKey(uuid.getValue())) return userData.get(uuid.getValue());
        }
        return new JSONArray();
    }

    public static void putUserData(HttpServletRequest request, HttpServletResponse response, JSONObject data) {
        var userData = (HashMap<String, JSONArray>) request.getServletContext().getAttribute("userData");
        Cookie uuid = CookieHelper.getCookie(request, "uuid");
        if(uuid == null) {
            uuid = new Cookie("uuid", UUID.randomUUID().toString());
            response.addCookie(uuid);
        }
        String uuidStr = uuid.getValue();
        if(!userData.containsKey(uuidStr)) userData.put(uuidStr, new JSONArray());

        userData.get(uuidStr).put(data);
    }

}
