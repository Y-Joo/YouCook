import 'package:flutter/material.dart';

void main() {
  runApp(HomeApp());
}

class HomeApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Search(),
    );
  }

}

class Search extends StatefulWidget {
  @override
  State createState() => SearchState();

}

class SearchState extends State<Search> {

  final TextEditingController _textController = new TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search'),
      ),
      body: _buildTextComposer(),
    );
  }
  
  Widget _buildTextComposer() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Row(
        children: <Widget>[
          Flexible(
            child: TextField(
              controller: _textController,
              onSubmitted: _handleSubmitted,
              decoration: new InputDecoration.collapsed(hintText: 'Send a Message'),
            ),
          ),
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 4.0),
            child: IconButton(
              icon: Icon(Icons.send),
              onPressed: () => _handleSubmitted(_textController.text),
            ),
          ),
        ],
      ),

    );
  }
  
  void _handleSubmitted(String text) {
    _textController.clear();
  }

}