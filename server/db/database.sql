CREATE DATABASE project111;

CREATE TABLE author(
                       id SERIAL,
                       firstname VARCHAR(255) NOT NULL,
                       lastname VARCHAR(255) NOT NULL,

                       PRIMARY KEY (id)
);

CREATE TABLE category(
                         id SERIAL,
                         name VARCHAR(255) NOT NULL,

                         PRIMARY KEY (id)
);

CREATE TABLE catalogcard(
                            id SERIAL,
                            title VARCHAR(255) NOT NULL,
                            authorid INTEGER,
                            categoryid INTEGER,
                            description VARCHAR(255),
                            isbn VARCHAR(255) NOT NULL,

                            PRIMARY KEY (id),
                            FOREIGN KEY (categoryid) REFERENCES category(id) DEFERRABLE INITIALLY DEFERRED,
                            FOREIGN KEY (authorid) REFERENCES author(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE book(
                     id SERIAL,
                     catalogid INTEGER,
                     isdeleted BOOLEAN NOT NULL,

                     PRIMARY KEY (id),
                     FOREIGN KEY (catalogid) REFERENCES catalogcard(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE usertype(
                         id SERIAL,
                         type VARCHAR(255) NOT NULL,

                         PRIMARY KEY (id)
);

CREATE TABLE useraccount(
                            id SERIAL,
                            firstname VARCHAR(255) NOT NULL,
                            lastname VARCHAR(255) NOT NULL,
                            username VARCHAR(255) NOT NULL,
                            usertypeid INTEGER NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            phonenumber VARCHAR(255) NOT NULL,
                            isdeleted boolean NOT NULL DEFAULT false,

                            PRIMARY KEY (id),
                            FOREIGN KEY (usertypeid) REFERENCES usertype(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE TABLE checkout(
                         id SERIAL,
                         useraccountid INTEGER NOT NULL,
                         bookid INTEGER NOT NULL,
                         dateout DATE NOT NULL,
                         returnby DATE NOT NULL,
                         isreturned BOOLEAN NOT NULL,
                         returndate DATE,

                         PRIMARY KEY (id),
                         FOREIGN KEY (useraccountid) REFERENCES useraccount(id) DEFERRABLE INITIALLY DEFERRED,
                         FOREIGN KEY (bookid) REFERENCES book(id) DEFERRABLE INITIALLY DEFERRED
);