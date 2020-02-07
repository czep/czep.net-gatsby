---
layout: post
title: Linux From Scratch in 2016
date: 2016-02-12
topics: linux
---

The [Linux From Scratch](http://linuxfromscratch.org/lfs/index.html) project is very much alive and well in 2016.  What began in the late 1990s as an educational process for building a completely customized GNU/Linux system from source code is still very much relevant today.  What you will learn from going through the LFS book will augment your linux knowledge like nothing else.  Give it a try, you won't be disappointed! 

<!--excerpt-->

## Long ago in a data center far far away

Back in the Spring of 2001, I happened to be leasing office space from a friendly local ISP.  They were so friendly they happily handed us a few unmetered, unfiltered Class C IP address blocks and a Cisco switch and told us to be safe and have fun.  With that I started building out my very own beige-box data center, populated with frankencomputers I had cobbled together from PC parts collected from machines scattered around our grad school offices or left out in hallways for facilities to collect.  One such box became my primary workstation for a few months before being commissioned as a combination web, mail, ftp, and doom server.  The specs of said machine were:

* Asus P2B Motherboard
* Intel Pentium 2 - 400MHz
* 128 MB PC100 SDRAM
* Matrox Millenium G200 AGP w/8MB VRAM
* DEC 21041 Tulip 10Mbps NIC
* Primary Master:  8.0 GB WD Caviar #38400
* Primary Slave:  20.0 GB WDC200BB-00AUA1

Ah, IDE drives, and Master/Slave nomenclature!  This was definitely a hot machine for its time.  Upgrading to 128 MB of RAM was like stepping into a Cadillac El Dorado when you were used to a Yugo.  The P2B was based on the 440BX chipset which became well known for its speed and stability on the P2 platform.  The DEC Tulip card was legendary in the linux community for its versatility and excellent driver support.  I had already been dual-booting the machine with RedHat 6.2 (using the original version numbering from RedHat Linux, long before the RHEL series) and Turbo Linux 6.0.2 when I set out to repurpose the box for use as a headless server.  Through slashdot, the hacker news of its day, I discovered the Linux From Scratch project spearheaded by the charismatic, energetic, entertaining, and highly prolific Gerard Beekmans.  "Your distro, your rules" was Beekmans' rallying cry which quickly galvanized a sizable collection of linux enthusiasts interested in creating their own linux system completely from source code.  Many people said it couldn't be done---that bootstrapping the toolchain by cross-compiling from an existing system would inevitably create dependencies to libraries running on the host system.  But Gerard pressed on, and with a growing band of compatriots at his side, Linux From Scratch soon became an exciting way to build a linux system while learning in detail how everything works.

To be precise, LFS is not really a distribution but rather a procedure for building a customized GNU/Linux installation.  The GNU prefix here becomes particularly obvious after going through the process.  Of the 62 packages included in Chapter 6, "Installing Basic System Software", only one of them is the linux kernel while most of the rest are part of the GNU project.  But let's not belabor this point which has become the subject of more than enough flame wars.  We may conventionally call it a 'linux' system, but for Linus' kernel to actually do anything it clearly needs to be surrounded by a great many packages written by many thousands of contributors whose work we should be grateful to find in the open source community, as it enables us to make our own operating systems without having to succumb to the offerings and associated lock-in of proprietary vendors.

I created a 4.0 GB partition on /dev/hdb2 to devote to Linux From Scratch using the then-current book version number 2.4.3.  This version included gcc 2.95.2, glibc 2.1.3, bash 2.04, and linux kernel version 2.4.4.  Although the primary outcome of my endeavor was to build a fast, stable linux system that would handle all the services I intended to use on it, the process was also highly educational and extremely rewarding.  No amount of documentation, however well written and extensive, can substitute for the kind of hands-on learning you get while building with Linux From Scratch.  If you haven't seen the project before, I highly recommend diving in and trying it out.  Go down to the basement and pick out an old box from days gone by and breathe new life into it while learning how linux really works and having fun in the process.

## Why LFS in 2016?

In 2015 I launched around a dozen EC2 instances for various projects.  Some were intended to run only for a short duration of a few days while others were to be used on a longer term, semi-permanent basis.  All of these were using the official CentOS AMI.  I also had access to various EC2 instances at work, again mostly on CentOS or Amazon Linux.  In our colo facilities, our servers ran CentOS.  I also consulted on various infrastructure projects for database and data analysis servers with Postgres, SAS, and SPSS running on RHEL.  I think you can see a trend here.  At the beginning of the year about half the machines I worked on were using version 6 but by the end of the year all of them had been migrated to version 7 and all new rollouts were on 7.

I have a fairly good understanding of how RHEL and its derivatives work.  In general, I feel comfortable doing things "the RedHat way".  However, the transition to version 7 was not as painless as it ought to have been.  There were some rather fundamental architectural changes that caused some consternation and generally raised eyebrows as to the decisions behind them.  While I wouldn't call any of these issues show stoppers---it's still the most stable and enterprise-grade linux distribution in my mind---I have reached a point in my linux sysadmin experience that I am not entirely comfortable ceding control of very important decisions about the basic operation of systems that I must manage.  Even if the people responsible are extremely competent and have a lot deeper knowledge of linux than I do, they are making decisions for the entire world of linux users.  While this works in most cases, there are some things I would prefer to do differently.  As a result, the inner satisfaction I get after setting up a server running the latest CentOS has lately been diminishing.  In its place is a slight discomfort that things aren't as perfect as I would like them to be.

At the same time, there is a good reason for sticking to one platform:  standardization is a good way to improve efficiency.  When you need to manage multiple machines, for multiple projects, and your responsibilities extend well beyond the initial seemingly mundane choice of operating system, it makes things a whole lot easier if you can stick to a stack that you already know very well.  As I mentioned, being a RedHat guy, when I need to deploy a new system, CentOS is going to be my first choice and despite these frustrations, that is not likely to change just because I wrestle with systemd or firewalld or complain about why `ifconfig` went away.

At one point during the summer, I briefly ventured into the world of FreeBSD.  I was actually a BSD user before discovering linux so this wasn't a huge disconnect.  This didn't last long, however, because I found a lot of issues with the software stack I was using---mainly python, postgres, and apache.  I ran into some sub-optimal performance issues that I never found the motivation to go figure out.  In addition, the process of setting up FreeBSD to run on EC2 is not an easy one, and this was clearly going to be a major problem given the amount of work I need to do in Amazon's environment.  

Next up, I went back to the first linux distribution that I discovered back in 1997:  Slackware.  Let me state at the outset that I will forever be a fan and humbly respectful of the Slackware distro.  However, it doesn't exactly inspire confidence when the first google search suggestion when typing in "slackware" is "is slackware dead".  The answer is of course no, slackware is very much alive, but it will take quite a bit of adjustment to adapt to its peculiar style of organization.  The packaging system is rather unique and while the philosophy of slackware is to be as unix-y as possible, it diverges in many significant ways from the majority of other popular distributions.  I just couldn't bring myself to hang my hat (!) on slackware and adapt a non-trivial set of scripts and procedures to work within its confines.

Last December I made the leap out of the cloud and back to my home office by procuring a new server for some heavy database work and scientific programming.  Since I knew I would be needing to compile a bunch of libraries by hand anyway, and this would not be a production server to manage on someone else's behalf, I knew I could devote a little more time to the mundane in order make the system exactly the way I wanted it.  The system was designed around the newly released Xeon E3 V5 processor.  Since I planned to do some work with the new AVX-512 instructions, I would need at least gcc 4.9 and linux 3.15, so RHEL or CentOS were out of the question for the time being.  So I turned next to Fedora 23, given the general maxim that next year's RHEL is this year's Fedora.  This gave me a 4.4 kernel and gcc 5, so I was all ready to rock the new Skylake processors.  But I still had that lingering sub-optimality that soured me on CentOS in the first place.  Hmmm, since this is my personal system after all, and nobody will care if I break it, why not go back to the source(!) and build the system exactly the way I want?

The reason I decided to revisit Linux From Scratch is not because I have a voluminous amount of free time; in fact, it is my lack of precious free time that is precisely why I want to run LFS.  This rather counter-intuitive argument bears some further explanation---how can I say this when a typical install of any modern linux distro will take about 15 minutes whereas the process of building Linux From Scratch requires an investment of at least several days of work?  The answer is that the up-front investment in setting up an LFS system is more than compensated for in the long run by endowing you with a painstakingly deep understanding of every piece of software you are running.  The process of installing LFS is not a purely academic exercise.  It forces you to learn (or recall what you learned long ago but forgot!) how a GNU/linux system works:  how the toolchain handles dynamic linking of executables to code in system libraries, how the init system works, how the kernel probes for and loads device drivers as modules, how everything is glued together with bash scripts, the purpose of the various virtual filesystems like /dev, /sys, and /proc, filesystems, networking, the C library, all the configuration settings in /etc, man pages, info pages, and the litany of simple, concise, beautiful utility programs that have formed the basis of unix-like operating systems ever since the 1970s.  It is a fascinating journey, not just for a newbie, but even the most experienced sysadmin can benefit from watching (and actively participating in) their system being built from the ground up.

Can you get the same result from studying an existing distribution?  Maybe you can, but the process will be a lot different, and you will not have the ability to make certain choices for yourself.  Do you want to use BSD-style init instead of SysV?  [You can do it](http://linuxfromscratch.org/hints/downloads/files/bsd-init.txt).  Do you want to optimize compiler settings for your architecture?  [You can do it](http://linuxfromscratch.org/hints/downloads/files/optimization.txt).  Do you want to use systemd or avoid it like the plague?  [You can do it](http://linuxfromscratch.org/hints/downloads/files/systemd.txt).  Package management?  Totally up to you.  Language support, the boot loader, the compiler, filesystem hierarchy, sudo or not, strong password rules, the shell, the kernel config, SELinux, ACLs, all of these can be customized for your precise needs, desires, expectations, and idiosyncracies.  Nowhere else can you find such choice.  And when it comes to linux, choice is good.



