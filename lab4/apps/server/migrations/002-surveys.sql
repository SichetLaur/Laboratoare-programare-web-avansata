CREATE TABLE surveys (
  id INTEGER PRIMARY KEY,
  entrance_id INTEGER NOT NULL REFERENCES entrances (id),
  surveyed_on TEXT NOT NULL, 
  surveyor TEXT NOT NULL,
  notes TEXT
) STRICT;
