````mermaid
flowchart LR
    Course["Course"] --- id(("id")) & coursecode(("coursecode")) & coursename(("coursename")) & syllabus(("syllabus")) & progression(("progression")) & created_at(("created_at"))

     Course:::entity
     id:::primaryKey
     coursecode:::attribute
     coursename:::attribute
     syllabus:::attribute
     progression:::attribute
     created_at:::attribute
    classDef entity fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    classDef primaryKey fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000
    classDef attribute fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    ```
````
