Comments
========

this lib will be used to add comments in github

- [x] discussion
- [ ] issues
- [ ] pull requests

### Usage

```yaml
  - name: Comment in discussion
    uses: shield-wall/comments@0.0.2
    with:
        organization: 'shield-wall'
        repository: 'myprofile'
        discussionId: 123
        body: |
            This is a multi-line test comment
            - With GitHub **Markdown** :sparkles:
            - Created by [shield-wall/comments][link1]

            [link1]: https://github.com/shield-wall/comments
```

You can also use body file

### FILES ARE NOT WORKING YET.
```yaml
  - name: Comment in discussion
    uses: shield-wall/comments@0.0.2
    with:
        organization: 'shield-wall'
        repository: 'myprofile'
        discussionId: 123
        bodyFileHeader: ./your_file.md #optional
        
        #optional
        body: | 
            This is a multi-line test comment
            - With GitHub **Markdown** :sparkles:
            - Created by [shield-wall/comments][link1]

            [link1]: https://github.com/shield-wall/comments
        
        bodyFileFooter: ./your_file_2.md #optional
```