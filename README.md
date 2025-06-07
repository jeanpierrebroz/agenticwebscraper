High-Level Architecture

User Facing Stuff:
-Mandatory:
    -Topic to search
    -Output format
-Optional:
    -Number of results
    -Depth of search
    -Model to use
    
Backend:
-Agents:
    -Search Keyword Generation Agent: Generates keywords based on the topic.
    -Output Formatter Agent: Formats the results based on user preferences.
    -Output Judge Agent: Evaluates the quality of the output and stores in database if approved.
    -Keyword Refinement Agent: Refines keywords based on number of successful additions.
-Web Scraping:
    -Playwright w/headless browsing
