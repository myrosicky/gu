package org.ll.gn;

import java.io.Serializable;

import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
    
    class Data implements Serializable{
	    private String number;
	    private boolean mute;
	    private boolean nextGame;
		public String getNumber() {
			return number;
		}
		public void setNumber(String number) {
			this.number = number;
		}
		public boolean isMute() {
			return mute;
		}
		public void setMute(boolean mute) {
			this.mute = mute;
		}
		public boolean isNextGame() {
			return nextGame;
		}
		public void setNextGame(boolean nextGame) {
			this.nextGame = nextGame;
		}
    }
    
    private Data data;
    
    @GetMapping("/")
    public String index(){
    	data = new Data();
    	data.setNumber("0");
    	data.setMute(false);
    	data.setNextGame(false);
    	return "index";
    }
    
    @GetMapping("/control")
    public String controlPanel(HttpServletResponse response){
    	return "controlPanel";
    }
    
    @GetMapping("/getData")
    @ResponseBody
    public Data getData(){
    	return data;
    }
    
    @PostMapping("/setNumber")
    @ResponseBody
    public void setNumber(@RequestParam String number){
    	data.setNumber(number);
    }
    
    @PostMapping("/setMute")
    @ResponseBody
    public void setMute(@RequestParam Boolean mute){
    	data.setMute(mute);
    }
    
    @PostMapping("/setNextGame")
    @ResponseBody
    public void setNextGame(@RequestParam Boolean nextGame){
    	data.setNextGame(nextGame);
    }
    
}
