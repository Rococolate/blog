@@@@@@@@@@
layout: default
title: 「docker-sinopia」使用docker部署npm私服sinopia
@@@@@@@@@@

![docker](/blog/images/blog/docker-swarm-hero2.png)

## 0.需求

代码写多了需要一个好的包管理工具，在javascript世界里就是npm了。但是npm也有缺点，国内访问的速度，还有npm是公开的，公司的项目不能往上面传。

## 1.sinopia

于是npm私有化的[sinopia](https://github.com/rlidwka/sinopia/) 项目进入了我们的视野，其作者是 [rlidwka](https://github.com/rlidwka) 猫大神

网上有很多文章安利Sinopia 

比如这篇 [《从零开始搭建npm仓库》](http://mp.weixin.qq.com/s?__biz=MzA5Nzk5MzE3Ng==&mid=401510950&idx=1&sn=f775d53fa36e2a7284eb6399e0a0f6c1)

和这篇 [使用sinopia搭建私有的npm仓库](https://segmentfault.com/a/1190000005790827)

> 首先，我先大概讲讲 Sinopia 的思路，我大概扫过一眼代码，大致有以下三点：

>通过兼容官方的 Registry 的接口来对终端中 NPM 命令的兼容，从而不需要使用像 cnpm 这样的命令

>正是由于 npm 支持诸如 --registry 以及 .npmrc 这样的配置文件，所以才使得上一条可以正常使用，而不需要任何 hacky 的代价

>官方的 npm 使用 CouchDB 作为仓库数据库（大致听说），不过 Sinopia 将直接使用文件系统来作为存储结构，这样可以非常方便我们对缓存以及发布的仓库进行查看

安装启动非常简单

```bash
    $ npm install -g sinopia
    $ sinopia
```

## 1.1 sinopia的权限管理

这里先说一下sinopia的权限管理，后面会用到

sinopia 使用config.yml文件进行配置，而其中权限管理也是在里面

#### 1.1.1 注册问题可以通过设置max_users: -1来禁止注册

```yaml
    auth:
      htpasswd:
        file: ./htpasswd
        # Maximum amount of users allowed to register, defaults to "+inf".
        # You can set this to -1 to disable registration.
        max_users: -1
```

虽然禁止注册，但还是可以通过同目录下的 htpasswd 文件写入用户信息，下面我在htpasswd写入一个test用户

```vim
    test:$6$kMLVq2SadeapeA==$rhJI1L92Xt99n23Voa4yq3TqwWD0pS08mNfBQNwX7XkUOHectx2x31nVIpUDTTFcpOgKw6PBbixDTOnNqdwDd1:autocreated 2016-12-20T02:15:13.371Z
```

密码是 123456 通过SHA1哈稀后转base64

#### 1.1.2 packages 权限配置

```yaml
    packages:
      '*':
        # allow all users to read packages (including non-authenticated users)
        #
        # you can specify usernames/groupnames (depending on your auth plugin)
        # and three keywords: "$all", "$anonymous", "$authenticated"
        access: $all

        # allow 'test' to publish packages
        publish: test

        # if package is not available locally, proxy requests to 'npmjs' registry
        proxy: npmjs
```

access是安装权限的用户列表

publish是发布权限的用户列表

proxy是代理对应uplinks

access，和publish 可以使用

$all 表示所有人都可以执行对应的操作

$authenticated 表示只有通过验证的人可以执行对应操作

$anonymous 表示只有匿名者可以进行对应操作（通常无用）

或者填写用户配置表里的用户名字

上面配置表示所有的包,所有人都可以下载,但只有test用户能发布
  
## 2.问题来了

看一下github sinopia项目已经一年多没有更新了，而且大部分新的issues都没有closed

果然，npm安装sinopia时报错，error还挺多。

原来，这一年node在某个版本v8更新了crypt3和sinopia[冲突了](https://github.com/rlidwka/sinopia/issues/311)

## 3.docker

既然是环境的问题，那么在作者修复前docker是最合适的解决方案了。（其实就算作者修复后docker也很好用）

## 3.1 docker介绍

如果你还不知道docker，那么可以将docker看成是轻量级的虚拟机，隔离环境。

[docker官网](https://www.docker.com/)

[用docker快速配置前端开发环境](http://numbbbbb.com/2016/09/26/20160926_%E7%94%A8%20Docker%20%E5%BF%AB%E9%80%9F%E9%85%8D%E7%BD%AE%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83/)

## 3.2docker的一些概念

>Docker 中最重要的三个概念是 Container（容器）、Image（镜像）和 Volume（卷）

>Image 是静态内容，如果你要把某个 Image 跑起来，那就需要一个 Container。这里面有一点很重要：Container 中所做的改动不会保存到 Image。举个例子，你跑起来一个 Ubuntu Image，然后 touch wisdomtmt 创建一个新文件，这时候如果直接重启 Container，文件就没了。那怎么保存改动？很简单，执行 docker commit ContainerID TAG 即可。

>有同学就要问了，如果每次做改动都要 commit，我写起代码来岂不是很不方便？万一写到一半不小心重启 Docker 怎么办？这确实是个问题，Docker 也有对应的解决方法：使用 Volume。

>简单来说，Volume 就是专门存放数据的文件夹，启动 Image 时可以挂载一个或多个 Volume，Volume 中的数据独立于 Image，重启不会丢失。我们创建一个 Volume，挂载到系统的一个目录下，然后把代码都放进去就可以了

## 3.3下载安装docker

Mac和windows用户推荐使用Docker Toolbox [官网](https://www.docker.com/products/docker-toolbox)

Linux 环境配置可以参考这篇：[Installation on Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntulinux/)

安装不详细展开，下面都以Linux为列。

## 3.4使用docker

创建sinopia镜像

这里使用[https://github.com/kfatehi/docker-sinopia/](https://github.com/kfatehi/docker-sinopia/) 里的配置文件为基础稍作修改

```bash
    $ mkdir docker 
    $ cd docker
    $ git clone https://github.com/kfatehi/docker-sinopia.git
    $ cd docker-sinopia
    $ ls
    config.yaml  Dockerfile  Makefile  README.md  start.sh
    $ vim htpasswd
```

创建htpasswd并修改：

```vim
    test:$6$kMLVq2SadeapeA==$rhJI1L92Xt99n23Voa4yq3TqwWD0pS08mNfBQNwX7XkUOHectx2x31nVIpUDTTFcpOgKw6PBbixDTOnNqdwDd1:autocreated 2016-12-20T02:15:13.371Z
```

```bash
    vim config.yaml
```

修改配置文件里的用户权限：

```yaml
    packages:
      '@*/*':
        # scoped packages
        access: $all
        publish: test

      '*':
        # allow all users (including non-authenticated users) to read and
        # publish all packages
        #
        # you can specify usernames/groupnames (depending on your auth plugin)
        # and three keywords: "$all", "$anonymous", "$authenticated"
        access: $all

        # allow all known users to publish packages
        # (anyone can register by default, remember?)
        publish: test
```

```bash
    vim Dockerfile
```

修改Dockerfile

```bash
    FROM node:0.12
    MAINTAINER Keyvan Fatehi <keyvanfatehi@gmail.com>
    RUN adduser --disabled-password --gecos "" sinopia
    RUN mkdir -p /opt/sinopia/storage
    WORKDIR /opt/sinopia
    ADD /htpasswd /opt/sinopia/htpasswd
    RUN chmod +rw htpasswd
    RUN npm install js-yaml sinopia
    RUN chown -R sinopia:sinopia /opt/sinopia
    USER sinopia
    ADD /config.yaml /tmp/config.yaml
    ADD /start.sh /opt/sinopia/start.sh
    CMD ["/opt/sinopia/start.sh"]
    EXPOSE 4873
    VOLUME /opt/sinopia
```

修改了第一行，指定node版本0.12

插入6～7行，将htpasswd文件复制到镜像内并赋予权限

注意最后一行是说指定 /opt/sinopia 文件夹为VOLUME，数据卷，即使重启这个容器 卷里面的内容都不会消失

Dockerfile是docker制作镜像的指令文件在它所在的目录下，我们使用以下命令

```bash
    $ sudo docker build -t sinopia .
```

注意后面.不是句号

稍等片刻（视网络环境，国内比较慢，服务器上好很多），docker会下载基础镜像文件（我们这里是node：0.12）然后自动按照Dockerfile的步骤配置好并生成

```bash
  $ sudo docker images

    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    sinopia             latest              72b028393246        5 minutes ago       703.4 MB
```

查看生成的镜像

```bash
    $ sudo docker run -itd --name my-sinopia -p 4873:4873 sinopia
    390975e8bf66503babde356ab074b33cefd688cbe259046ff9a4556f3a4c0c88
```

容器开启镜像跑起来

-itd d是后台运行 -p 是端口映射 --name 是命名容器

```bash
    $ sudo docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS                       PORTS                    NAMES
    390975e8bf66        sinopia             "/opt/sinopia/start.s"   About a minute ago   Up About a minute            0.0.0.0:4873->4873/tcp   my-sinopia
```

ps -a 是查看当前的容器

```bash
    $ sudo docker logs my-sinopia

    #
    # This is the default config file. It allows all users to do anything,
    # so don't use it on production systems.
    #
    # Look here for more config file examples:
    # https://github.com/rlidwka/sinopia/tree/master/conf
    #

    # path to a directory with all packages
    storage: ./storage

    auth:
      htpasswd:
        file: ./htpasswd
        # Maximum amount of users allowed to register, defaults to "+inf".
        # You can set this to -1 to disable registration.
        max_users: 1000

    # a list of other known repositories we can talk to
    uplinks:
      npmjs:
        url: https://registry.npmjs.org/

    packages:
      '@*/*':
        # scoped packages
        access: $all
        publish: test

      '*':
        # allow all users (including non-authenticated users) to read and
        # publish all packages
        #
        # you can specify usernames/groupnames (depending on your auth plugin)
        # and three keywords: "$all", "$anonymous", "$authenticated"
        access: $all

        # allow all known users to publish packages
        # (anyone can register by default, remember?)
        publish: test

        # if package is not available locally, proxy requests to 'npmjs' registry
        proxy: npmjs

    # log settings
    logs:
      - {type: stdout, format: pretty, level: http}
      #- {type: file, path: sinopia.log, level: info}

    listen:
      - 0.0.0.0:4873
     warn  --- config file  - /opt/sinopia/config.yaml
     warn  --- http address - http://0.0.0.0:4873/
```

看logs可以知道我们的sinopia服务已经跑起来了，由于端口映射的关系，我们用浏览器访问服务器的4873端口即可

这里我在服务器用nginx做了映射，[可以访问](http://sinopia.rococolate.com)

## 3.5备份和恢复

备份

```bash
    sudo docker run --volumes-from my-sinopia -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /opt/sinopia

    ……

    backup.tar  config.yaml  Dockerfile  htpasswd  Makefile  README.md  start.sh
```

会生成一个backup.tar

恢复：

```bash
    sudo docker stop my-sinopia
    sudo docker rm my-sinopia
    sudo docker run --name my-sinopia -d -p 4873:4873 sinopia
    sudo docker stop my-sinopia
    sudo docker run --volumes-from my-sinopia -v $(pwd):/backup ubuntu tar xvf /backup/backup.tar
    sudo docker start sinopia
```


可以看出，其实就是备份数据卷里面的内容

## 4.使用nrm管理npm源

本地安装nrm

```bash
    $ npm install -g nrm
    $ nrm add private  http://sinopia.rococolate.com/  # 添加新的npm源，这里是我的sinopia
    $ nrm use private # 使用我的sinopia
```

## 5.登录和发布

```bash
    nrm use private

       Registry has been set to: http://sinopia.rococolate.com/

    npm adduser
    Username: test
    Password:123456
    Email: (this IS public) 123456@qq.com

    npm whoami
    test
```

我们以test身份登录成功,刚好有个Alert对话框的UI包，我尝试发布

```bash
    npm publish
    + nm_show_tips@1.0.0
```

发布成功