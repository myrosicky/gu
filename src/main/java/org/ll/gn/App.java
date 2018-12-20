package org.ll.gn;

import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@Controller
public class App 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    }
    
    private int total = 5;
    private int current = 0;
    
    @GetMapping("/")
    public String index(HttpServletResponse response){
    	response.addHeader("Cache-Control", CacheControl.maxAge(0, TimeUnit.SECONDS).noCache().noStore().getHeaderValue());
    	return "index" + ((current++ ) % total);
    }
    
    
}
