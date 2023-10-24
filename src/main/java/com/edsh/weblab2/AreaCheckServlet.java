package com.edsh.weblab2;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.UUID;

@WebServlet(name = "areaCheckServlet", value = "/area-check")
public class AreaCheckServlet extends HttpServlet {

    private final String[] args = {"x", "y", "r"};

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        long startTime = System.nanoTime();
        var result = new JSONObject();
        var writer = response.getWriter();
        float[] values = new float[args.length];

        for (String arg : args) {
            try {
                result.put(arg, Float.parseFloat(request.getParameter(arg)));
            } catch (NullPointerException e) {
                result.put("error", "Argument '" + arg + "' is undefined");
                writer.println(result);
                return;
            } catch (NumberFormatException e) {
                result.put("error", "Argument '" + arg + "' is not a number");
                writer.println(result);
                return;
            }
        }

        float x = result.getFloat("x");
        float y = result.getFloat("y");
        float r = result.getFloat("r");

        if(r < 1 || r > 5) {
            result.put("error", "Argument 'r' must be in [1; 5] bounds");
            writer.println(result);
            return;
        }

        result.put("result", checkHit(x, y, r));

        result.put("datetime", ZonedDateTime.now(ZoneId.of("+00:00")).toString());
        float elapsedTime = System.nanoTime() - startTime;
        result.put("exectime", elapsedTime / 1000);

        CookieHelper.putUserData(request, response, result);
        writer.println(result);
    }

    private boolean checkHit(float x, float y, float r) {
        if(x >= 0) {
            if(y > 0) return x*x + y*y <= r*r; // up right
            else return x <= r && y >= -r/2; // down right
        } else {
            if(y >= 0) return y <= 2*x + r; // up left
            else return false; // down left
        }
    }

}