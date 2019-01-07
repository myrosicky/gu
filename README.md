# gu

运行步骤：
1. 下载到本地。如果是zip格式下载，请于下载后解压。
2. 打开命令行：
   
   (1) cd <gu根目录>
   
   (2)
   
       在linux下：
       
   ./mvnw spring-boot:run
   
   or
   
       在windows下：
   
   mvnw.cmd spring-boot:run 
3. 当第2步执行完毕， 命令行会显示  Tomcat started on port(s): 8099 (http)， 此时打开浏览器，访问http://localhost:8099/  。 另外访问http://localhost:8099/control 进入控制面板。
