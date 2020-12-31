To install MongoDB in Mac

1. Install home-brew (// package mgr for Mac).
2. brew install mongodb.
3. To verify mongo --version.
4. sudo chown -R anoop /System/Volumes/Data/data/db (// for OS Catalina the default storage path for mongo is /System/Volumes/Data/data/db)
5. mongod -dbpath /System/Volumes/Data/data/db

To install robomongo or robo3T with mongod running

1. Head over to robomongo.org and download robo3T.
2. Open the file and click on ‘create’ and give the name ‘’Localhost’ and leave the rest and click on `save`.

To kill mongod already running

1. sudo lsof -iTCP -sTCP:LISTEN -n -P
2. sudo kill <mongo_command_pid>
