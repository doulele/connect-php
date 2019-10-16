# 遇到的问题
## localhost 无法使用;用cmd ping localhost 不抛错，但是出现::1情况而且ping 127.0.0.1的时候正常

    这个时候一般是ipv6的原因导致的；可以卸载ipv6(没找到怎么卸)；也可以降低ipv6的优先级
    
      1. 使用管理员权限进入cmd,输入netsh interface ipv6 show prefixpolicies,查看ipv6(::/0)的优先级是否大于ipv4(::/96,::ffff:0:0/96)的优先级；
      
      2. 如果大于则依次执行netsh int ipv6 set prefix ::/96 50 0;
                         netsh int ipv6 set prefix ::ffff:0:0/96 40 1;     
                         netsh int ipv6 set prefix 2002::/16 35 2;    
                         netsh int ipv6 set prefix 2001::/32 30 3;    
                         netsh int ipv6 set prefix ::1/128 10 4;     
                         netsh int ipv6 set prefix ::/0 5 5;    
                         netsh int ipv6 set prefix fc00::/7 3 13;     
                         netsh int ipv6 set prefix fec0::/10 1 11;     
                         netsh int ipv6 set prefix 3ffe::/16 1 12;
      
      3. 最后输入netsh interface ipv6 show prefixpolicies 再查看ipv6的优先级是否小于ipv4
      
    如果还不生效可以打开C:/WINDOWS/system32/drivers/etc/hosts看里边是否包含 127.0.0.1 localhost，不包含添加上去就好；再不好可能就是IIS的问题卸载重装也行
    
## gulp-connect-php无法使用

  1. 需要安装php环境(暂时理解)，会用到php.exe和php.ini；可以装wampserver;安装的时候一定要记得关闭电脑IIS服务;  https://pan.baidu.com/s/1DuYYUgmdhqWYNX3nDkBEjw
  
  2. connect-php中bin:"....../php.exe"自己的php.exe环境地址;ini:'....../php.ini'自己的php.ini
  地址还是必须要写的(暂时理解)
  
## 关于上传的问题

   1. win10不支持.gitignore创建文件,可以.gitignore.来创建;
   
   2. 上传文件名千万不能和gulp装的某个插件名重名;
   
   3. git status 查看上传项不正确的时候要用git reset退回原来
